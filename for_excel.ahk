#Persistent  ; スクリプトを終了しないように設定
SetTimer, CheckKeyPress, 10  ; 10ミリ秒ごとにキーの押下状態をチェック
count := 0  ; キーが押された回数をカウント

; 数字キー 1 〜 0 を監視
~Numpad1::
    count++  ; カウントをインクリメント
    ; カウントに応じて文字を入力
    if (count = 1)
    {
        Send, :  ; 1回目は ":" を入力
    }
    else if (count = 3)
    {
        Send, .  ; 3回目は "." を入力
    }
    else if (count = 4)
    {
        Send, {Enter}  ; 4回目は Enter を入力
    }

    ; 4回押されたらカウントをリセット
    if (count >= 4)
    {
        count := 0
    }
    return

~Numpad2::
    count++
    if (count = 1)
    {
        Send, :  ; 1回目は ":" を入力
    }
    else if (count = 3)
    {
        Send, .  ; 3回目は "." を入力
    }
    else if (count = 3)
    {
        Send, {Enter}  ; 4回目は Enter を入力
    }
    if (count >= 4)
    {
        count := 0
    }
    return

~Numpad3::
    count++
    if (count = 1)
    {
        Send, :  ; 1回目は ":" を入力
    }
    else if (count = 3)
    {
        Send, .  ; 3回目は "." を入力
    }
    else if (count = 4)
    {
        Send, {Enter}  ; 4回目は Enter を入力
    }
    if (count >= 4)
    {
        count := 0
    }
    return

~Numpad4::
    count++
    if (count = 1)
    {
        Send, :  ; 1回目は ":" を入力
    }
    else if (count = 3)
    {
        Send, .  ; 3回目は "." を入力
    }
    else if (count = 4)
    {
        Send, {Enter}  ; 4回目は Enter を入力
    }
    if (count >= 4)
    {
        count := 0
    }
    return

~Numpad5::
    count++
    if (count = 1)
    {
        Send, :  ; 1回目は ":" を入力
    }
    else if (count = 3)
    {
        Send, .  ; 3回目は "." を入力
    }
    else if (count = 4)
    {
        Send, {Enter}  ; 4回目は Enter を入力
    }
    if (count >= 4)
    {
        count := 0
    }
    return

~Numpad6::
    count++
    if (count = 1)
    {
        Send, :  ; 1回目は ":" を入力
    }
    else if (count = 3)
    {
        Send, .  ; 3回目は "." を入力
    }
    else if (count = 4)
    {
        Send, {Enter}  ; 4回目は Enter を入力
    }
    if (count >= 4)
    {
        count := 0
    }
    return

~Numpad7::
    count++
    if (count = 1)
    {
        Send, :  ; 1回目は ":" を入力
    }
    else if (count = 3)
    {
        Send, .  ; 3回目は "." を入力
    }
    else if (count = 4)
    {
        Send, {Enter}  ; 4回目は Enter を入力
    }
    if (count >= 4)
    {
        count := 0
    }
    return

~Numpad8::
    count++
    if (count = 1)
    {
        Send, :  ; 1回目は ":" を入力
    }
    else if (count = 3)
    {
        Send, .  ; 3回目は "." を入力
    }
    else if (count = 4)
    {
        Send, {Enter}  ; 4回目は Enter を入力
    }
    if (count >= 4)
    {
        count := 0
    }
    return

~Numpad9::
    count++
    if (count = 1)
    {
        Send, :  ; 1回目は ":" を入力
    }
    else if (count = 3)
    {
        Send, .  ; 3回目は "." を入力
    }
    else if (count = 4)
    {
        Send, {Enter}  ; 4回目は Enter を入力
    }
    if (count >= 4)
    {
        count := 0
    }
    return

~Numpad0::
    count++
    if (count = 1)
    {
        Send, :  ; 1回目は ":" を入力
    }
    else if (count = 3)
    {
        Send, .  ; 3回目は "." を入力
    }
    else if (count = 4)
    {
        Send, {Enter}  ; 4回目は Enter を入力
    }
    if (count >= 4)
    {
        count := 0
    }
    return

CheckKeyPress:
    ; Esc キーが押された場合はループを終了
    if GetKeyState("Esc", "P")
    {
        ExitApp  ; スクリプトを終了
    }
    return
