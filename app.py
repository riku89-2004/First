# -*- coding: utf-8 -*-
"""
Created on Wed Jan  1 10:04:55 2025
Last Change on Tue Jan  8 10:02:40 2025

@author: 流空
"""

import os
import json
import openpyxl
from flask import Flask, render_template, request # type: ignore
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt # type: ignore
import numpy as np
import pandas as pd
import datetime

app = Flask(__name__)

DEBUG = False #True
checkbox = None

Skills = ["20sec", "60sec", "2000m", "20min", "60min"]
output_path = os.path.join("static", "graph.png")
file_path = os.path.join(os.path.dirname(__file__), "store", "5challenges.xlsx")


MAPPINGS_FILE = os.path.join(os.path.dirname(__file__), 'lib', 'mappings.json')
with open(MAPPINGS_FILE, 'r', encoding='utf-8') as f:
    mappings = json.load(f)
#mapping.jsonを取得

def read_excel(posted_data):  # posted_dataにはselectedNameかselectedTypeを代入
    i = 0
    data_list = []
    workbook = openpyxl.load_workbook(file_path)
    
    for i in range(5):
        Skill = Skills[i]
        sheet_name = mappings[Skill]
        data_cell = mappings[posted_data][i]
        sheet = workbook[sheet_name]
        temp_value = sheet[data_cell]
        # エラーハンドリング: 値がない場合
        if temp_value is None or temp_value == "":
            debug_print(f"Error: Cell {data_cell} in sheet {sheet_name} is empty.")
            return f"エラー: セル {data_cell} が空です。"

        if isinstance(temp_value, tuple):
            # 範囲の場合、各セルを処理
            for cell in temp_value:
                value = cell.value
            # ここでvalueを使った処理
                debug_print(f"temp value {cell}, value {value}, value type {type(value)}")
                try:
                    data = time_to_watt(value)
                    debug_print(f"data:{data}")
                    data_list.append(data)
                except ValueError as e:
                    debug_print(f"Error: {e}")
                    return f"エラー: 無効な時間形式です - {value}"
        else:
            debug_print("tupleじゃない")
            value = temp_value.value
            debug_print(f"value:{value}, {type(value)}")
            try:
                data = time_to_watt(value)
                debug_print(f"data:{data}")
                data_list.append(data)
            except ValueError as e:
                debug_print(f"Error: {e}")
                return f"エラー: 無効な時間形式です - {value}"
    debug_print(data_list)
    return data_list

def time_to_watt(time_value):
    if isinstance(time_value, str):  # 文字列の場合
        minutes, seconds = map(float, time_value.split(':'))
    elif isinstance(time_value, datetime.time):  # datetime.time 型の場合
        minutes = time_value.minute
        seconds = time_value.second
    elif isinstance(time_value, int):  # int 型の場合
        return time_value
    elif isinstance(time_value, float):  # int 型の場合
        return time_value
    else:
        raise ValueError(f"無効なデータ形式: {time_value}")
    
    # 分を秒に変換して合計
    total_seconds = minutes * 60 + seconds
    watt = 2.80 / (total_seconds / 500)**3
    return watt

def ratio_watt(values1, values2 ,checkbox):
   if checkbox == "on":
        values1 = list(map(int, values1))
        values2 = list(map(int, values2))
        ratio_list = [round((v1 / v2) * 100, 2) for v1, v2 in zip(values1, values2)]
        return ratio_list
    else:
        # 3番目の項目（インデックス2）を取得
        third_item = values1[2]
        index_values = [1.73, 1.53, 1, 0.85, 0.76]
        if third_item == 0:
            raise ValueError("The third item in the list cannot be zero.")

        # 各項目を3番目の項目で割り、100倍し、小数点3位で四捨五入する
        percent_list = [round((x / third_item) * 100, 3) for x in values1]
        # 各項目をindex_valuesの対応する項目で割り、小数点2位で四捨五入する
        ratio_list = [round(p / idx, 2) for p, idx in zip(percent_list, index_values)]
        return ratio_list


def debug_print(message):
    if DEBUG:
        print(message)

def create_radar_chart(skills, listB, listA, output_path):
    labels = np.array(skills)
    listB = np.array(listB)
    listA = np.array(listA)

    # データを閉じるために最初の値を最後に追加
    listB = np.append(listB,listB[0])
    listA = np.append(listA, listA[0])
    labels = np.append(labels, labels[0])

    # 角度の計算
    angles = np.linspace(0, 2 * np.pi, len(labels), endpoint=True)

    # レーダーチャートの描画
    fig, ax = plt.subplots(figsize=(6, 6), subplot_kw=dict(polar=True))

    # 平均値グラフ
    ax.plot(angles, listB, color='blue', linewidth=2, label=request.form.get("selectedType"))
    ax.fill(angles, listB, color='blue', alpha=0.25)

    # ユーザー値グラフ
    ax.plot(angles, listA, color='red', linewidth=2, label=request.form.get("selectedName")+"'s score")
    ax.fill(angles, listA, color='red', alpha=0.25)

    # スキルラベルを設定
    ax.set_xticks(angles[:-1])
    ax.set_xticklabels(skills)

    # y軸の設定
    yticks = range(5, 125, 5)
    ax.set_yticks(yticks)
    ax.set_yticklabels([str(y) if y % 10 == 0 else "" for y in yticks], color="gray")

    # タイトルと凡例
    ax.set_title("5items analysis", fontsize=20, pad=20)
    ax.legend(loc=4, bbox_to_anchor=(1.1, 0))

    # 保存
    plt.savefig(output_path)
    plt.close()

@app.route("/", methods=["GET", "POST"])
def index():
    message = None
    Getlist = []
    Compare_list = []
    Ratio_listA = []
    Ratio_listB =[]

    if request.method == "POST":
        selected_name = request.form.get("selectedName")
        selected_type = request.form.get("selectedType")
        checkbox = request.form.get("calculationMethod")

        debug_print(f"Selected name: {selected_name}") 
        debug_print(f"Selected type: {selected_type}")
        debug_print(f"option: {checkbox}")

        Getlist = read_excel(selected_name)
        Compare_list = read_excel(selected_type)

        debug_print(f"Getlist: {Getlist}")
        debug_print(f"Compare_list: {Compare_list}")

        Ratio_listA = ratio_watt(Getlist, Compare_list, checkbox)
        Ratio_listB = ratio_watt(Compare_list, Compare_list, checkbox)

        Ratio_listA = list(map(int, Ratio_listA))
        Ratio_listB = list(map(int, Ratio_listB))

        debug_print(f"ListA: {Ratio_listA}")
        debug_print(f"ListB: {Ratio_listB}")

        if len(Ratio_listA) < 5 or len(Ratio_listB) < 5:
            debug_print("足りんが")
            return render_template("index.html", message="データが不完全です。")
        try:
            create_radar_chart(Skills, Ratio_listB, Ratio_listA, output_path)
        except Exception as e:
            debug_print(f"Radar chart creation failed: {e}")
            return render_template("index.html", message=f"グラフ作成中にエラーが発生しました: {e}")
    return render_template("index.html", message = message, img_path = output_path)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # 環境変数PORTを取得し、デフォルト値5000を使用
    app.run(host="0.0.0.0", port=port)
