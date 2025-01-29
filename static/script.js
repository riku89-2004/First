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


function openDialog(contentId) {
    const dialog = document.getElementById('dialog');
    const dialogContent = document.getElementById('dialog-content');

    // ダイアログの内容を設定
    if (contentId === 'content1') {
        dialogContent.innerHTML = generateContent1HTML();
    } else if (contentId === 'content2') {
        dialogContent.innerHTML = generateContent2HTML();
    }

    // リスナーを設定
    setTimeout(() => {
        if (contentId === 'content1') setupFormListeners();
    }, 0);

    dialog.style.display = 'flex';
}

// ダイアログを閉じる関数
function closeDialog() {
    document.getElementById('dialog').style.display = 'none';
}

// ダイアログ1の内容を生成する関数
function generateContent1HTML() {
    return `
        <button type="button" class="close-btn" onclick="closeDialog()">×</button>
        <div class="main_contents">
            <div class="app_area">
                <form action="#" method="post" class="form_area" id="myForm">
                    <h1>5種目測定 2024</h1>
                    <label for="main-category">名前を選んでください</label><br>
                    <select id="main-category" name="mainCategory">
                        <option value="">--学年--</option>
                        <option value="OTEith">1年</option>
                        <option value="OTSeth">2年</option>
                        <option value="OTSith">3年</option>
                    </select>
                    <label for="sub-category"></label>
                    <select id="sub-category" name="selectedName">
                        <option value="">--名前--</option>
                    </select>
                    <h3>比較対処を選んでください</h3>
                    <div class="form_style">
                        ${generateComparisonOptionsHTML()}
                    </div>
                    <button type="submit" class="btn btn_sub" onclick="handleFormSubmit(); return false;">作成</button>
                </form>
            </div>
            <div class="graph_area">
                <h2>画像は以下に生成されます</h2>
                <img id="radarChart" src="" alt="Radar Chart">
            </div>
            <div>${generateInstructionsHTML()}</div>
        </div>
    `;
}

function generateContent2HTML() {
    return `
        <button class="close-btn" onclick="closeDialog()">×</button>
        <h2>ダイアログ 2</h2>
        <p>これは2番目のダイアログボックスです。</p>
    `;
}


// 比較オプションを生成する関数
function generateComparisonOptionsHTML() {
    return `
        <div class="type_select">
            <div><input type="radio" id="type1" name="selectedType" value="Average1" required><label for="type1">Men's Average</label></div>
            <div><input type="radio" id="type2" name="selectedType" value="Average2" required><label for="type2">Women's Average</label></div>
            <div><input type="radio" id="type3" name="selectedType" value="Average3" required><label for="type3">2000M top8(time)'s Average</label></div>
            <div><input type="radio" id="type4" name="selectedType" value="Average4" required><label for="type4">2000M top8(idt)'s Average</label></div>
            <div><input type="radio" id="type5" name="selectedType" value="Average5" required><label for="type5">20min top8's Average</label></div>
            <div><input type="radio" id="type6" name="selectedType" value="" required><label for="type6">個人</label></div>
            <div class="individual-select" style="margin-left: 20px;">
                <select id="individualMainCategory" name="individualMainCategory">
                    <option value="">--学年--</option>
                    <option value="OTEith">1年</option>
                    <option value="OTSeth">2年</option>
                    <option value="OTSith">3年</option>
                </select>
                <select id="individualSubCategory" name="individualSelectedName">
                    <option value="">--名前--</option>
                </select>
            </div>
            <div><label><input type="checkbox" name="calculationMethod" value="on">option</label></div>
        </div>
    `;
}

// 説明文を生成する関数
function generateInstructionsHTML() {
    return `
        <div class="explain">
            <h2>使い方</h2>
            <p>2000Mのスコアを100点とした時の他の種目の相対的なスコアをラダーチャートとして表示します。</p>
            <p>選択したAverageのスコアを100点としたときの自分の相対的なスコアを見たい場合optionにチェックを入れてください。</p>
            <p>まず、計算したい人の名前を選んでください。5種目を提出しきっていない人はエラーになると思います。</p>
            <p>次に、比較対象を選び、最後に作成ボタンを押してください。</p>
            <p class="attention">※相対的なスコアの分布なので、グラフの面積が小さいからといってタイムが遅いというわけではないことに注意してください</p>
            <p class="attention">optionにチェックを入れた場合は面積が大きいほど速いということになります</p>
            <p class="attention old"> 現在参照しているファイル: 5種目測定　12/27/2024</p>
            <p class="attention"> 現在参照しているファイル: 5種目測定　01/11/2025</p>
        </div>
    `;
}


// フォームのリスナーを設定する関数
function setupFormListeners() {
    const mainCategory = document.getElementById("main-category");
    const subCategory = document.getElementById("sub-category");
    //1
    const individualMainCategory = document.getElementById('individualMainCategory');
    const individualSubCategory = document.getElementById('individualSubCategory');
    const type6Radio = document.getElementById("type6");

    mainCategory.addEventListener("change", () => {
        updateSubCategory(mainCategory.value, subCategory);
    });

    //2
    // 個人用カテゴリーの変更時に個人用サブカテゴリーを更新する処理
    individualMainCategory.addEventListener("change", () => {
        updateSubCategory(individualMainCategory.value, individualSubCategory);
    });

    // individualSubCategoryの選択変更時にtype6のvalueを更新
    individualSubCategory.addEventListener("change", () => {
        type6Radio.value = individualSubCategory.value; // 選択された値をtype6のvalueに設定
    });
}

// サブカテゴリーのリストを更新する関数
function updateSubCategory(mainCategoryValue, subCategoryElement) {
    // サブカテゴリーをクリア
    subCategoryElement.innerHTML = '<option value="">--名前--</option>';

    // 新しい選択肢を追加
    if (subCategoryData[mainCategoryValue]) {
        subCategoryData[mainCategoryValue].forEach((item) => {
            const option = document.createElement('option');
            option.value = item.value;
            option.textContent = item.text;
            subCategoryElement.appendChild(option);
        });
    }
}


async function handleFormSubmit() {
    event.preventDefault();  // 画面遷移を防ぐ

    const form = document.getElementById("myForm");
    const formData = new FormData(form);

    try {
        const response = await fetch("/", {  // Flask のエンドポイントに送信
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("サーバーからエラーが返されました。");
        }

        const data = await response.json();
        updateImageSrc(data);  // 画像を更新
    } catch (error) {
        console.error("エラー:", error);
    }
}

let lastTimestamp = 0;  // 前回のタイムスタンプを記録する変数

function updateImageSrc(data) {
    const imgElement = document.getElementById("radarChart");
    const newTimestamp = Date.now();

    // 新しい画像の方が時間的に後なら更新
    if (newTimestamp > lastTimestamp) {
        imgElement.src = data.img_path + "?timestamp=" + newTimestamp;
        imgElement.style.display = "block";  // 画像を表示
        lastTimestamp = newTimestamp;  // 最新のタイムスタンプを記録
    }
}