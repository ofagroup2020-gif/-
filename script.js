// ===== 簡易パスコード（好きなコードに変更OK） =====
const ACCESS_CODE = "ofa2025"; // ★ここを書き換えると暗証番号を変更できます

// LINEブラウザでも確実に動くよう、DOM読み込みイベントに依存しない書き方
(function () {
  const lockScreen = document.getElementById("lock-screen");
  const app = document.getElementById("app");
  const input = document.getElementById("accessCode");
  const button = document.getElementById("unlockButton");
  const message = document.getElementById("lockMessage");

  // 要素が取れなければ何もしない（エラー防止）
  if (!lockScreen || !app || !input || !button || !message) {
    return;
  }

  // localStorage が使えない環境（LINEブラウザ等）でも落ちないようにする
  let storageAvailable = true;
  try {
    const testKey = "_ofa_test";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
  } catch (e) {
    storageAvailable = false;
  }

  const getUnlocked = () => {
    if (!storageAvailable) return false;
    try {
      return window.localStorage.getItem("ofa_portal_unlocked") === "true";
    } catch (e) {
      return false;
    }
  };

  const setUnlocked = () => {
    if (!storageAvailable) return;
    try {
      window.localStorage.setItem("ofa_portal_unlocked", "true");
    } catch (e) {
      // 何もしない（エラー無視）
    }
  };

  // すでにログイン済みならロック画面を飛ばす
  if (getUnlocked()) {
    lockScreen.classList.add("hidden");
    app.classList.remove("hidden");
  }

  const tryUnlock = () => {
    const value = (input.value || "").trim();
    if (value === ACCESS_CODE) {
      // ログイン成功
      setUnlocked();
      lockScreen.classList.add("hidden");
      app.classList.remove("hidden");
      message.textContent = "";
    } else {
      // ログイン失敗
      message.textContent = "パスコードが違います。もう一度入力してください。";
      input.value = "";
      input.focus();
    }
  };

  // ボタンタップ
  button.addEventListener("click", tryUnlock);

  // Enterキーでもログイン
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      tryUnlock();
    }
  });
})();
