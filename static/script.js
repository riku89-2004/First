document.addEventListener("DOMContentLoaded", function () {
  const mainCategory = document.getElementById("main-category");
  const subCategory = document.getElementById("sub-category");

  // 小分類のデータ
  const subCategoryData = {
      OTEith: [
          { value: "abekenta", text: "阿部憲太" },
          { value: "iimure", text: "飯牟礼" },
          { value: "iwai", text: "岩井" },
          { value: "ogihara", text: "扇原"},
          { value: "kunimoto", text: "國本"},
          { value: "kunihiro", text: "國廣"},
          { value: "shiraishi", text: "白石"},
          { value: "takahashi", text: "高橋"},
          { value: "tanimizu", text: "谷水"},
          { value: "tyaenn", text: "茶圓"},
          { value: "hirata", text: "平田"},
          { value: "fujimori", text: "藤森"},
          { value: "mimura", text: "三村"},
          { value: "musya", text: "武者"}
      ],
      OTSeth: [
          { value: "inokuma", text: "猪熊" },
          { value: "iwamoto", text: "岩本" },
          { value: "ishikawa", text: "石川"},
          { value: "kasahara", text: "笠原" },
          { value: "kaneko", text: "金子"},
          { value: "timura", text: "木村"},
          { value: "koito", text: "小糸"},
          { value: "shikata", text: "志方"},
          { value: "takao", text: "高尾"},
          { value: "tokunaga", text: "徳永"},
          { value: "nakagawa", text: "中川"},
          { value: "nakamurakouki", text: "中村航貴"},
          { value: "fujieda", text: "藤枝"},
          { value: "furutachi", text: "古舘"},
          { value: "mino", text: "三野"},
          { value: "watanabe", text: "渡邊"}
      ],
      OTSith: [
          { value: "asami", text: "浅見" },
          { value: "abeyuuki", text: "阿部優貴" },
          { value: "itimura", text: "市村" },
          { value: "itou", text: "伊藤"},
          { value: "ogiuchi", text: "荻内"},
          { value: "kishimoto", text: "岸本"},
          { value: "shiroza", text: "城座"},
          { value: "shinn", text: "申"},
          { value: "suzuki", text: "鈴木"},
          { value: "nakamurataiga", text: "中村大河"},
          { value: "nakamuraryouta", text: "中村遼太"},
          { value: "baba", text: "馬場"},
          { value: "hosoya", text: "細谷"},
          { value: "minegishi", text: "峯岸"}
      ]
  };

  // 大分類が変更されたときの処理
  mainCategory.addEventListener("change", () => {
      const selectedCategory = mainCategory.value;
      mainCategory.setAttribute("name", "mainCategory");

      // 小分類の選択肢をリセット
      const resetMessage = selectedCategory ? '--選択してください--' : '--大分類を選択してください--';
      subCategory.innerHTML = `<option value="">${resetMessage}</option>`;

      // 小分類の選択肢を追加
      if (selectedCategory && subCategoryData[selectedCategory]) {
          subCategoryData[selectedCategory].forEach(item => {
              const option = document.createElement("option");
              option.value = item.value;
              option.textContent = item.text;
              subCategory.appendChild(option);
          });
      }
  });
});
