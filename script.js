(() => {
  "use strict";

  /* ---------------------------------------------------------------
     hand-drawn line icons, one per craft, stroke = currentColor
  --------------------------------------------------------------- */
  const ICONS = {
    novel:   `<svg viewBox="0 0 24 24"><path d="M4 5c3-1.5 6-1.5 8 0v14c-2-1.5-5-1.5-8 0z"/><path d="M20 5c-3-1.5-6-1.5-8 0v14c2-1.5 5-1.5 8 0z"/></svg>`,
    app:     `<svg viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/></svg>`,
    game:    `<svg viewBox="0 0 24 24"><path d="M7 9h10a4 4 0 0 1 4 4l1 4a2 2 0 0 1-3.4 1.4L16 16H8l-2.6 2.4A2 2 0 0 1 3 17l1-4a4 4 0 0 1 3-4z"/><path d="M8 12v3M6.5 13.5h3"/><circle cx="16" cy="12" r=".8" fill="currentColor"/><circle cx="18.2" cy="14" r=".8" fill="currentColor"/></svg>`,
    sound:   `<svg viewBox="0 0 24 24"><path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"/></svg>`,
    eco:     `<svg viewBox="0 0 24 24"><path d="M6 20C4 12 9 4 19 4c1 8-4 14-13 14z"/><path d="M6 20c2-6 5-9 10-11"/></svg>`,
    mask:    `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 10.5c.5-1 2-1 2.5 0M13.5 10.5c.5-1 2-1 2.5 0M8 15c1.5 1.5 6.5 1.5 8 0"/></svg>`,
    code:    `<svg viewBox="0 0 24 24"><path d="M9 8 4 12l5 4M15 8l5 4-5 4"/></svg>`,
    layers:  `<svg viewBox="0 0 24 24"><path d="M12 3 3 8l9 5 9-5z"/><path d="M3 13l9 5 9-5"/></svg>`,
    chip:    `<svg viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="1"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/></svg>`,
    network: `<svg viewBox="0 0 24 24"><circle cx="6" cy="7" r="2"/><circle cx="18" cy="7" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7.6 8.2 10.5 16M16.4 8.2 13.5 16M8 7h8"/></svg>`,
    mobile:  `<svg viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M10 10l-2 2 2 2M14 10l2 2-2 2"/></svg>`,
    audio:   `<svg viewBox="0 0 24 24"><path d="M3 12h4l3-7v14l-3-7H3z"/><path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"/></svg>`,
    you:     `<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="3.4"/><path d="M5 20c1.5-4.5 5-6 7-6s5.5 1.5 7 6"/></svg>`,
  };

  const iconSVG = (key) => ICONS[key] || ICONS.app;

  const escapeHTML = (str) =>
    String(str).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const ROLE_FILTERS = ["すべて", "エンジニア", "デザイナー", "作曲家", "ライター", "企画"];

  /* ---------------------------------------------------------------
     権利・条件テンプレ ― both sides must agree before a match forms
  --------------------------------------------------------------- */
  const AGREEMENT_PRINCIPLE =
    "収益が発生した場合は、参加者全員で分配します。割合は運営が定めず、参加者どうしで決めて、ここに記録します。";

  const AGREEMENT_NOTE =
    "この取り決めはタネワザ上の記録であり、法的な契約書ではありません。大きな金額が動く可能性がある場合は、参加者間で別途書面を交わすことを強くおすすめします。タネワザは参加者間の金銭トラブルについて責任を負いません。";

  const AGREEMENT_TEMPLATES = [
    { id: "credit",    name: "共同クレジット型",   desc: "制作時は無償。成果物は参加メンバー全員の共同名義で記載します。収益が発生した場合は、参加者全員で割合を話し合って分配します。" },
    { id: "revshare",  name: "レベニューシェア型", desc: "最初から収益化を見込む企画向け。収益が発生したら貢献度に応じて分配し、割合はチャットで相談して決めます。" },
    { id: "portfolio", name: "ポートフォリオ型",   desc: "実績づくりが主目的。各自が担当パートを自分の実績として公開できます。収益が発生した場合は、参加者全員で割合を話し合って分配します。" },
  ];

  /* ---------------------------------------------------------------
     dummy data
  --------------------------------------------------------------- */
  const projects = [
    { code: "IDEA-014", name: "卯月ネム", icon: "novel", side: "project", honki: true,
      catch: "深夜のコンビニで異世界に迷い込む、短編ホラー小説アプリ。",
      bio: "大学時代はホラー研究会所属。Web小説で長編を書いては挫折すること数回、「続きが気になる短編」をアプリの形で届けたいと思っています。",
      roles: [{ role: "エンジニア", needed: 1, filled: 0 }, { role: "デザイナー", needed: 1, filled: 0 }],
      alreadyLikesYou: true,
      replies: ["読んでもらえるの、素直にうれしいです。", "実は続きのプロットもあるので、今度読んでほしいです。", "一緒に世界観を練ってもらえたら心強いです。"] },
    { code: "IDEA-021", name: "高瀬ソラ", icon: "app", side: "project",
      catch: "『推し活×位置情報』のアプリ、座組みを組んで形にしたい。",
      bio: "普段はアパレル店員。休みの日は「こんなアプリあったら」をメモするのが趣味で、ノートはもう3冊目です。デザインの相談は少しずつ進んでいます。",
      roles: [{ role: "エンジニア", needed: 1, filled: 0 }, { role: "デザイナー", needed: 1, filled: 1 }],
      alreadyLikesYou: true,
      replies: ["メモ帳、見せ始めると止まらないので気をつけてください。", "まずは一番シンプルな機能から一緒に考えたいです。", "アプリ名の候補もいくつか用意してあります。"] },
    { code: "IDEA-033", name: "檜山まどか", icon: "game", side: "project",
      catch: "祖母の漬物レシピを、最強の発酵ゲームにしたい。",
      bio: "実家は漬物屋の三代目候補。発酵の奥深さを伝えるゲームを企画中。音まわりを一緒に考えてくれる人を探しています。",
      roles: [{ role: "エンジニア", needed: 1, filled: 0 }, { role: "作曲家", needed: 1, filled: 0 }],
      alreadyLikesYou: false,
      replies: ["漬物の話、長くなるので途中で止めてください。", "発酵の温度管理をゲームシステムに落とし込みたいんです。", "祖母にも遊んでもらえるものにしたいです。"] },
    { code: "IDEA-040", name: "東雲コウ", icon: "sound", side: "project", honki: true,
      catch: "駅の音だけで街を当てるクイズ、絶対おもしろい。",
      bio: "通勤中に環境音を録るのが習慣。耳だけで場所がわかる感覚をクイズにしたくて、問題文を練ってくれるライターを探しています。",
      roles: [{ role: "エンジニア", needed: 1, filled: 0 }, { role: "ライター", needed: 1, filled: 0 }],
      alreadyLikesYou: true,
      replies: ["録りためた音源、100駅分くらいあります。", "正解したときの効果音にもこだわりたいです。", "一緒に街を歩いて録音するのも楽しそうです。"] },
    { code: "IDEA-052", name: "柊ミカゲ", icon: "eco", side: "project",
      catch: "捨てられた傘に第二の人生を。傘シェア構想中。",
      bio: "雨の日にビニール傘が捨てられているのを見るたび胸が痛みます。街のどこでも借りて返せる仕組みを、デザインの力も借りて詰めたいです。",
      roles: [{ role: "エンジニア", needed: 2, filled: 1 }, { role: "デザイナー", needed: 1, filled: 0 }],
      alreadyLikesYou: false,
      replies: ["まずは自分の街の1エリアで試したいです。", "置き場所のデザインも一緒に考えてほしいです。", "地味だけど、続けられる仕組みにしたいです。"] },
    { code: "IDEA-067", name: "白金レイ", icon: "mask", side: "project",
      catch: "占いよりよく当たる『今日の言い訳ジェネレーター』。",
      bio: "遅刻の言い訳を100個くらいストック済み。誰も傷つけないジョークアプリで人を笑わせたいタイプです。文面は既にライターと考え中。",
      roles: [{ role: "エンジニア", needed: 1, filled: 0 }, { role: "ライター", needed: 1, filled: 1 }],
      alreadyLikesYou: true,
      replies: ["言い訳のストック、まだまだ増やせます。", "笑ってもらえる言い訳だけ厳選しましょう。", "真面目に作るふざけたアプリ、憧れます。"] },
  ];

  const creators = [
    { code: "MAKE-009", name: "綾城ハヤト", icon: "game", side: "creator", role: "エンジニア",
      catch: "Unityでゲーム3本リリース。次は誰かの妄想を動かしたい。",
      bio: "高校生の頃から独学でUnity。個人ゲームを3本リリースして、今は誰かのアイデアを形にする側に回りたい気分です。",
      tags: ["Unity", "ゲーム開発", "C#"], alreadyLikesYou: true,
      links: [
        { label: "GitHub", url: "https://example.com/github/ayashiro" },
        { label: "X", url: "https://example.com/x/ayashiro" },
        { label: "ポートフォリオ", url: "https://example.com/portfolio/ayashiro" },
      ],
      replies: ["企画書、荒くても全然大丈夫です。", "まずは動くものを1週間で作ってみますね。", "一緒に遊べる状態まで持っていきましょう。"] },
    { code: "MAKE-018", name: "深津ワタル", icon: "layers", side: "creator", role: "デザイナー",
      catch: "触って気持ちいいUIをデザインするのが得意。実装も少しできます。",
      bio: "受託制作で5年UIをデザインしてきました。動きが気持ちいいだけで使われ方が変わる瞬間が好きです。",
      tags: ["UIデザイン", "プロトタイピング", "Figma"], alreadyLikesYou: true,
      links: [
        { label: "ポートフォリオ", url: "https://example.com/portfolio/fukatsu" },
        { label: "Instagram", url: "https://example.com/instagram/fukatsu" },
      ],
      replies: ["触った時の気持ちよさ、こだわらせてください。", "ワイヤーフレームだけでも先に見たいです。", "アニメーションは後からいくらでも足せます。"] },
    { code: "MAKE-026", name: "御堂アキラ", icon: "chip", side: "creator", role: "エンジニア",
      catch: "IoTと電子工作でなんでも動かします。ハード大好き。",
      bio: "部屋の半分が基板とはんだごて。ソフトだけで完結しないアイデアほど燃えるタイプです。",
      tags: ["組込み", "IoT", "Arduino"], alreadyLikesYou: false,
      replies: ["ハードが絡むなら得意分野です。", "試作品、まず1週間で組んでみます。", "壊れてもいい前提で試作しましょう。"] },
    { code: "MAKE-035", name: "姫野トウカ", icon: "network", side: "creator", role: "エンジニア",
      catch: "機械学習で『できたら面白い』を形にするの得意。",
      bio: "前職はデータ分析。今は個人開発で機械学習を使った小さな実験を繰り返しています。",
      tags: ["機械学習", "Python", "データ"], alreadyLikesYou: true,
      links: [
        { label: "GitHub", url: "https://example.com/github/himeno" },
        { label: "note", url: "https://example.com/note/himeno" },
      ],
      replies: ["データさえあれば、まず動かしてみます。", "精度より先に『面白いか』を確かめたいです。", "小さく試して、だめならすぐ次にいきましょう。"] },
    { code: "MAKE-044", name: "早乙女ケイ", icon: "mobile", side: "creator", role: "企画",
      catch: "個人開発でアプリ4つ完走。企画から形にする力があります。",
      bio: "平日夜と週末だけでアプリを4つ運用中。企画・設計・リリースまで一人でやってきた経験を、誰かのチームでも活かしたいです。",
      tags: ["企画設計", "個人開発", "ロードマップ"], alreadyLikesYou: true,
      links: [
        { label: "X", url: "https://example.com/x/saotome" },
        { label: "note", url: "https://example.com/note/saotome" },
      ],
      replies: ["リリースまでのスケジュール、一緒に引きましょう。", "小さく出して育てる進め方が得意です。", "まず全体の設計図を描かせてください。"] },
    { code: "MAKE-058", name: "九十九リク", icon: "audio", side: "creator", role: "作曲家",
      catch: "音まわりの制作が専門。曲づくりからインタラクティブな音響設計まで。",
      bio: "展示やインスタレーションの音楽制作を専門にしています。触ると音が変わる体験を作るのが好きです。",
      tags: ["作編曲", "Web Audio", "サウンドデザイン"], alreadyLikesYou: false,
      replies: ["音が絡むアイデア、大歓迎です。", "まずはラフな音のスケッチから始めましょう。", "展示で使えるレベルまで詰められます。"] },
    { code: "MAKE-063", name: "夜久ツバサ", icon: "novel", side: "creator", role: "ライター",
      catch: "note連載3本。誰かの企画に言葉で背骨を通すのが得意です。",
      bio: "広告コピーとエッセイの中間くらいの文章を書いています。企画書を読み込んで、コンセプトを一言に削るのが得意技です。",
      tags: ["コピーライティング", "構成", "ネーミング"], alreadyLikesYou: true,
      links: [
        { label: "note", url: "https://example.com/note/yaku" },
        { label: "X", url: "https://example.com/x/yaku" },
      ],
      replies: ["まずはコンセプトを一行にまとめてみますね。", "言葉の温度感、すり合わせさせてください。", "ネーミング案、いくつか出しておきます。"] },
  ];

  const allProfiles = [...projects, ...creators];
  const profileByCode = new Map(allProfiles.map((p) => [p.code, p]));

  /* ---------------------------------------------------------------
     persistence ― localStorage は SecurityError（プライベート
     ブラウジング等）に備えて必ず try-catch で包む
  --------------------------------------------------------------- */
  const STORAGE_KEY = "tanewaza-state-v1";

  function safeLoad() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function persist() {
    try {
      const out = {};
      state.forEach((entry, code) => {
        out[code] = {
          liked: entry.liked,
          mutual: entry.mutual,
          agreement: entry.agreement,
          arrangement: entry.arrangement,
          messages: entry.messages,
          replyIndex: entry.replyIndex,
        };
      });
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(out));
    } catch {
      /* 保存できない環境ではセッション内のみで動作する */
    }
  }

  const isValidMessage = (m) =>
    m && typeof m === "object" &&
    ["you", "them", "system"].includes(m.from) &&
    typeof m.text === "string";

  const isValidArrangement = (a) =>
    a && typeof a === "object" &&
    typeof a.method === "string" &&
    typeof a.detail === "string" &&
    typeof a.leave === "string" &&
    typeof a.rights === "string";

  const stored = safeLoad();
  const state = new Map(
    allProfiles.map((p) => {
      const s = stored[p.code];
      return [p.code, {
        liked: !!(s && s.liked),
        mutual: !!(s && s.mutual),
        agreement: (s && typeof s.agreement === "string") ? s.agreement : null,
        arrangement: (s && isValidArrangement(s.arrangement)) ? s.arrangement : null,
        messages: (s && Array.isArray(s.messages)) ? s.messages.filter(isValidMessage) : [],
        replyIndex: (s && Number.isInteger(s.replyIndex) && s.replyIndex >= 0) ? s.replyIndex : 0,
      }];
    })
  );

  let activeRoleFilter = "すべて";

  /* ---------------------------------------------------------------
     card rendering ― button state is derived from state so that
     re-renders (role filter) and reloads never lose progress
  --------------------------------------------------------------- */
  const tiltFor = (index) => {
    const pattern = [-2.2, 1.6, -1.1, 2.4, -1.8, 1.2];
    return pattern[index % pattern.length];
  };

  function buttonStateFor(code) {
    const entry = state.get(code);
    if (entry.agreement) return { label: "座組み中",   liked: true,  pending: false, pressed: true };
    if (entry.mutual)    return { label: "合意待ち",   liked: false, pending: true,  pressed: true };
    if (entry.liked)     return { label: "いいね済み", liked: true,  pending: false, pressed: true };
    return { label: "いいね", liked: false, pending: false, pressed: false };
  }

  function stampBtnHTML(code) {
    const s = buttonStateFor(code);
    const cls = `stamp-btn${s.liked ? " is-liked" : ""}${s.pending ? " is-pending" : ""}`;
    return `
      <button class="${cls}" type="button" data-code="${code}" aria-pressed="${s.pressed}">
        <span class="stamp-btn__label">${s.label}</span>
      </button>
    `;
  }

  function syncStampButtons(code) {
    const s = buttonStateFor(code);
    document.querySelectorAll(`.stamp-btn[data-code="${code}"]`).forEach((btn) => {
      btn.classList.toggle("is-liked", s.liked);
      btn.classList.toggle("is-pending", s.pending);
      btn.setAttribute("aria-pressed", String(s.pressed));
      btn.querySelector(".stamp-btn__label").textContent = s.label;
    });
  }

  const REPORT_ADDRESS = "report@tanewaza.example";

  function reportMailto(profile) {
    const subject = encodeURIComponent(`【通報】${profile.code} ${profile.name}`);
    const body = encodeURIComponent(
      `通報対象: ${profile.code} ${profile.name}\n` +
      `通報理由: （具体的にご記入ください）\n\n` +
      `※コミュニティガイドライン違反の報告はタネワザ運営が確認し、通報者の情報は相手に開示されません。`
    );
    return `mailto:${REPORT_ADDRESS}?subject=${subject}&body=${body}`;
  }

  function reportLinkHTML(profile) {
    return `<a class="card__report" href="${reportMailto(profile)}" title="コミュニティガイドライン違反を運営に報告">通報する</a>`;
  }

  function roleChipHTML(r) {
    const remaining = r.needed - r.filled;
    const full = remaining <= 0;
    const label = full ? "満員" : `残り${remaining}`;
    return `<li class="role-chip${full ? " role-chip--full" : ""}">${r.role} ${label}</li>`;
  }

  function projectCardTemplate(profile, index) {
    const seal = profile.honki
      ? `<button class="honki-seal" type="button" data-code="${profile.code}"
           aria-label="本気の印の説明を表示"><span>本気</span></button>`
      : "";
    return `
      <article class="card" style="--tilt:${tiltFor(index)}deg" data-code="${profile.code}">
        <span class="card__pin"></span>
        ${seal}
        <span class="card__code">${profile.code}</span>
        <div class="card__top">
          <span class="card__icon">${iconSVG(profile.icon)}</span>
          <h3 class="card__name">${profile.name}</h3>
        </div>
        <p class="card__catch">${profile.catch}</p>
        <ul class="card__roles">
          ${profile.roles.map(roleChipHTML).join("")}
        </ul>
        <div class="card__footer">${reportLinkHTML(profile)}${stampBtnHTML(profile.code)}</div>
      </article>
    `;
  }

  function creatorCardTemplate(profile, index) {
    const verified = (profile.links && profile.links.length)
      ? `<span class="card__verified" title="実績リンク連携済み">✓ 連携済み</span>`
      : "";
    return `
      <article class="card" style="--tilt:${tiltFor(index)}deg" data-code="${profile.code}">
        <span class="card__pin"></span>
        <span class="card__code">${profile.code}</span>
        <div class="card__top">
          <span class="card__icon">${iconSVG(profile.icon)}</span>
          <div>
            <h3 class="card__name">${profile.name}</h3>
            <span class="card__role-badge">${profile.role}</span>${verified}
          </div>
        </div>
        <p class="card__catch">${profile.catch}</p>
        <ul class="card__tags">
          ${profile.tags.map((t) => `<li>${t}</li>`).join("")}
        </ul>
        <div class="card__footer">${reportLinkHTML(profile)}${stampBtnHTML(profile.code)}</div>
      </article>
    `;
  }

  let honkiOnly = false;

  function renderProjects() {
    // 本気の印つきをわずかに優先（元の掲載順は保ったまま先頭へ）
    let list = [...projects].sort((a, b) => (b.honki ? 1 : 0) - (a.honki ? 1 : 0));
    if (honkiOnly) list = list.filter((p) => p.honki);
    document.getElementById("idea-cards").innerHTML =
      list.map((p, i) => projectCardTemplate(p, i)).join("") ||
      `<p class="matches__empty">本気の印が灯った座組みはまだありません。</p>`;
  }

  document.getElementById("honki-filter-btn").addEventListener("click", () => {
    honkiOnly = !honkiOnly;
    const btn = document.getElementById("honki-filter-btn");
    btn.classList.toggle("is-active", honkiOnly);
    btn.setAttribute("aria-pressed", String(honkiOnly));
    renderProjects();
  });

  /* ---------------------------------------------------------------
     本気の印 ― explanation popover (tap the seal)
  --------------------------------------------------------------- */
  const honkiPop = document.createElement("div");
  honkiPop.className = "honki-pop";
  honkiPop.hidden = true;
  honkiPop.setAttribute("role", "note");
  honkiPop.innerHTML = `
    <p class="honki-pop__body">発案者がこの座組みに、1人1枠しかない本気の印を灯しています。</p>
    <p class="honki-pop__note">本気の印はβ期間中は無料・1ユーザーにつき1プロジェクトまで。<a href="pricing.html">料金について</a></p>
  `;
  document.body.appendChild(honkiPop);
  let honkiPopFor = null;

  function hideHonkiPop() {
    honkiPop.hidden = true;
    honkiPopFor = null;
  }

  function toggleHonkiPop(sealEl) {
    const code = sealEl.dataset.code;
    if (honkiPopFor === code) {
      hideHonkiPop();
      return;
    }
    const rect = sealEl.getBoundingClientRect();
    honkiPop.hidden = false;
    honkiPopFor = code;
    const popWidth = Math.min(272, window.innerWidth - 24);
    honkiPop.style.width = `${popWidth}px`;
    honkiPop.style.left = `${Math.max(12, Math.min(rect.right - popWidth, window.innerWidth - popWidth - 12))}px`;
    honkiPop.style.top = `${rect.bottom + 10}px`;
  }

  document.addEventListener("click", (e) => {
    if (!honkiPop.hidden && !e.target.closest(".honki-pop") && !e.target.closest(".honki-seal")) {
      hideHonkiPop();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideHonkiPop();
  });
  window.addEventListener("scroll", hideHonkiPop, { passive: true });

  function renderCreators() {
    const filtered = activeRoleFilter === "すべて"
      ? creators
      : creators.filter((c) => c.role === activeRoleFilter);
    document.getElementById("engineer-cards").innerHTML =
      filtered.map((p, i) => creatorCardTemplate(p, i)).join("") ||
      `<p class="matches__empty">この職種の作り手はまだいません。</p>`;
  }

  function renderRoleFilter() {
    const el = document.getElementById("role-filter");
    el.innerHTML = ROLE_FILTERS.map((r) =>
      `<button type="button" class="role-filter__btn${r === activeRoleFilter ? " is-active" : ""}"
        aria-pressed="${r === activeRoleFilter}" data-role="${r}">${r}</button>`
    ).join("");
  }

  document.getElementById("role-filter").addEventListener("click", (e) => {
    const btn = e.target.closest(".role-filter__btn");
    if (!btn) return;
    activeRoleFilter = btn.dataset.role;
    renderRoleFilter();
    renderCreators();
  });

  /* ---------------------------------------------------------------
     modal manager ― 常に1枚だけ。開いている間は背面の操作を無効化し、
     ×・Escape・背景クリックのすべてで確実に閉じる
  --------------------------------------------------------------- */
  let activeOverlayEl = null;
  let lastFocused = null;

  function openOverlay(el, focusTarget) {
    if (!el || activeOverlayEl === el) return;
    hideHonkiPop();
    if (activeOverlayEl) {
      activeOverlayEl.hidden = true;   // swap: keep the single-modal invariant
    } else {
      lastFocused = document.activeElement;
      document.body.classList.add("has-modal");
    }
    el.hidden = false;
    activeOverlayEl = el;
    const target = focusTarget || el.querySelector("button, input, textarea");
    if (target) target.focus();
  }

  function closeOverlay(el = activeOverlayEl) {
    if (!el || el.hidden) return;
    el.hidden = true;
    if (activeOverlayEl !== el) return;
    activeOverlayEl = null;
    document.body.classList.remove("has-modal");
    if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
    lastFocused = null;
    // flow finished? → show the next queued match (連打対策)
    window.setTimeout(() => {
      if (!activeOverlayEl) {
        matchFlowActive = false;
        processMatchQueue();
      }
    }, 150);
  }

  document.addEventListener("keydown", (e) => {
    if (!activeOverlayEl) return;
    if (e.key === "Escape") {
      closeOverlay();
      return;
    }
    if (e.key === "Tab") {
      const focusables = [...activeOverlayEl.querySelectorAll("button, input, textarea, [href]")]
        .filter((el) => !el.disabled && el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  document.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", () => closeOverlay());
  });

  /* ---------------------------------------------------------------
     like flow ― mutual like queues exactly one match bulletin at a
     time; agreement is required before MATCHED
  --------------------------------------------------------------- */
  const matchQueue = [];
  let matchFlowActive = false;

  function enqueueMatch(code) {
    if (!matchQueue.includes(code)) matchQueue.push(code);
    processMatchQueue();
  }

  function processMatchQueue() {
    if (matchFlowActive || activeOverlayEl || matchQueue.length === 0) return;
    matchFlowActive = true;
    const code = matchQueue.shift();
    window.setTimeout(() => openMatch(code), 420);
  }

  function likeProfile(code) {
    const entry = state.get(code);
    if (entry.liked) return;
    entry.liked = true;
    const profile = profileByCode.get(code);
    if (profile && profile.alreadyLikesYou) entry.mutual = true;
    syncStampButtons(code);
    persist();
    if (entry.mutual) enqueueMatch(code);
  }

  function handleStampClick(code) {
    const entry = state.get(code);
    if (!entry || entry.agreement) return;
    if (entry.mutual) {
      openAgreement(code);   // 合意待ち → resume the agreement flow
      return;
    }
    likeProfile(code);
  }

  document.getElementById("board").addEventListener("click", (e) => {
    if (activeOverlayEl) return;   // モーダル表示中は背面のいいねを無効化
    if (e.target.closest(".card__report")) return;   // 通報リンクは mailto にのみ委ねる
    const seal = e.target.closest(".honki-seal");
    if (seal) {
      toggleHonkiPop(seal);
      return;
    }
    const likeBtn = e.target.closest(".stamp-btn");
    if (likeBtn) {
      handleStampClick(likeBtn.dataset.code);
      return;
    }
    const card = e.target.closest(".card");
    if (card) openDetail(card.dataset.code);
  });

  /* ---------------------------------------------------------------
     profile detail panel
  --------------------------------------------------------------- */
  const detailOverlay = document.getElementById("detail-overlay");
  const detailPanel = document.querySelector(".detail-panel");
  const detailCode = document.getElementById("detail-code");
  const detailIcon = document.getElementById("detail-icon");
  const detailName = document.getElementById("detail-name");
  const detailRoleBadge = document.getElementById("detail-role-badge");
  const detailCatch = document.getElementById("detail-catch");
  const detailBio = document.getElementById("detail-bio");
  const detailTagsLabel = document.getElementById("detail-tags-label");
  const detailTags = document.getElementById("detail-tags");
  const detailLike = document.getElementById("detail-like");

  function openDetail(code) {
    const profile = profileByCode.get(code);
    if (!profile) return;
    detailPanel.dataset.side = profile.side === "creator" ? "engineer" : "idea";
    detailCode.textContent = profile.code;
    detailIcon.innerHTML = iconSVG(profile.icon);
    detailName.textContent = profile.name;
    detailCatch.textContent = profile.catch;
    detailBio.textContent = profile.bio;

    const detailVerified = document.getElementById("detail-verified");
    const linksLabel = document.getElementById("detail-links-label");
    const linksList = document.getElementById("detail-links");
    const linksNote = document.getElementById("detail-links-note");

    if (profile.side === "project") {
      detailRoleBadge.hidden = true;
      detailTagsLabel.textContent = "募集ロール";
      detailTags.innerHTML = profile.roles.map(roleChipHTML).join("");
      detailVerified.hidden = true;
      linksLabel.hidden = true;
      linksList.hidden = true;
      linksNote.hidden = true;
    } else {
      detailRoleBadge.hidden = false;
      detailRoleBadge.textContent = profile.role;
      detailTagsLabel.textContent = "得意なこと";
      detailTags.innerHTML = profile.tags.map((t) => `<li>${t}</li>`).join("");

      const links = profile.links || [];
      detailVerified.hidden = links.length === 0;
      linksLabel.hidden = false;
      linksList.hidden = false;
      linksNote.hidden = false;
      linksList.innerHTML = links.length
        ? links.map((l) =>
            `<li><a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a></li>`
          ).join("")
        : `<li class="detail-panel__links-empty">まだ登録されていません</li>`;
    }

    detailLike.dataset.code = code;
    document.getElementById("detail-honki").hidden = !(profile.side === "project" && profile.honki);
    document.getElementById("detail-report").href = reportMailto(profile);
    syncStampButtons(code);
    openOverlay(detailOverlay, detailLike);
  }

  detailLike.addEventListener("click", () => {
    const code = detailLike.dataset.code;
    const entry = state.get(code);
    if (!entry || entry.agreement) return;
    if (entry.mutual) {
      openAgreement(code);
      return;
    }
    likeProfile(code);
  });

  /* ---------------------------------------------------------------
     match bulletin ― 号外。合意フローへの入口
  --------------------------------------------------------------- */
  const matchOverlay = document.getElementById("match-overlay");
  const matchAgreeBtn = document.getElementById("match-agree");
  const matchLaterBtn = document.getElementById("match-later");
  const matchIcon = document.getElementById("match-icon");
  const matchName = document.getElementById("match-name");
  const matchPartnerName = document.getElementById("match-partner-name");

  function openMatch(code) {
    const profile = profileByCode.get(code);
    if (!profile) {
      matchFlowActive = false;
      processMatchQueue();
      return;
    }
    matchIcon.innerHTML = iconSVG(profile.icon);
    matchName.textContent = profile.name;
    matchPartnerName.textContent = profile.name;
    matchAgreeBtn.dataset.code = code;
    openOverlay(matchOverlay, matchAgreeBtn);
  }

  matchAgreeBtn.addEventListener("click", () => {
    openAgreement(matchAgreeBtn.dataset.code);
  });
  matchLaterBtn.addEventListener("click", () => closeOverlay(matchOverlay));

  /* ---------------------------------------------------------------
     agreement modal ― 権利・条件テンプレを選んで合意して初めて
     MATCHED に追加される（プロジェクト側・作り手側で共通の経路）
  --------------------------------------------------------------- */
  const agreeOverlay = document.getElementById("agree-overlay");
  const agreePrinciple = document.getElementById("agree-principle");
  const agreeSub = document.getElementById("agree-sub");
  const agreeList = document.getElementById("agree-list");
  const agreeArrangement = document.getElementById("agree-arrangement");
  const agreeNote = document.getElementById("agree-note");
  const agreeSubmit = document.getElementById("agree-submit");
  const arrDetail = document.getElementById("arr-detail");
  const arrMethodRatio = document.getElementById("arr-method-ratio");
  const arrLeaveOther = document.getElementById("arr-leave-other");
  const arrRightsOther = document.getElementById("arr-rights-other");
  let agreeFor = null;
  let agreeSelection = null;

  const radioValue = (name) => {
    const el = agreeArrangement.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : null;
  };

  function resetArrangementForm() {
    agreeArrangement.querySelectorAll("input[type=radio]").forEach((r) => (r.checked = false));
    [arrDetail, arrMethodRatio, arrLeaveOther, arrRightsOther].forEach((el) => (el.value = ""));
    [arrMethodRatio, arrLeaveOther, arrRightsOther].forEach((el) => (el.hidden = true));
  }

  function openAgreement(code) {
    const profile = profileByCode.get(code);
    if (!profile) return;
    agreeFor = code;
    agreeSelection = null;
    agreePrinciple.textContent = AGREEMENT_PRINCIPLE;
    agreeNote.textContent = AGREEMENT_NOTE;
    agreeSub.textContent = `${profile.name}さんとの座組みです。テンプレを選び、配分の取り決めを記録して合意します。`;
    agreeList.innerHTML = AGREEMENT_TEMPLATES.map((t) => `
      <li>
        <button type="button" class="agree-option" role="radio" aria-checked="false" data-tpl="${t.id}">
          <span class="agree-option__name">${t.name}</span>
          <span class="agree-option__desc">${t.desc}</span>
        </button>
      </li>
    `).join("");
    resetArrangementForm();
    agreeArrangement.hidden = true;
    agreeSubmit.disabled = true;
    agreeOverlay.querySelector(".tpl-panel").scrollTop = 0;
    openOverlay(agreeOverlay, agreeList.querySelector(".agree-option"));
  }

  agreeList.addEventListener("click", (e) => {
    const btn = e.target.closest(".agree-option");
    if (!btn) return;
    agreeSelection = btn.dataset.tpl;
    agreeList.querySelectorAll(".agree-option").forEach((b) => {
      const selected = b === btn;
      b.classList.toggle("is-selected", selected);
      b.setAttribute("aria-checked", String(selected));
    });
    agreeArrangement.hidden = false;
    validateAgreement();
  });

  // 「その他」「比率」を選んだら自由記述欄を表示
  agreeArrangement.addEventListener("change", (e) => {
    if (e.target.name === "arr-method") {
      arrMethodRatio.hidden = e.target.value !== "発案者と作り手で比率を決める";
      if (arrMethodRatio.hidden) arrMethodRatio.value = "";
    }
    if (e.target.name === "arr-leave") {
      arrLeaveOther.hidden = e.target.value !== "その他";
      if (arrLeaveOther.hidden) arrLeaveOther.value = "";
    }
    if (e.target.name === "arr-rights") {
      arrRightsOther.hidden = e.target.value !== "その他";
      if (arrRightsOther.hidden) arrRightsOther.value = "";
    }
    validateAgreement();
  });
  agreeArrangement.addEventListener("input", validateAgreement);

  function collectArrangement() {
    const method = radioValue("arr-method");
    const leave = radioValue("arr-leave");
    const rights = radioValue("arr-rights");
    if (!method || !leave || !rights) return null;
    if (!arrDetail.value.trim()) return null;
    if (method === "発案者と作り手で比率を決める" && !arrMethodRatio.value.trim()) return null;
    if (leave === "その他" && !arrLeaveOther.value.trim()) return null;
    if (rights === "その他" && !arrRightsOther.value.trim()) return null;

    const methodText = method === "発案者と作り手で比率を決める"
      ? `発案者と作り手で比率を決める（${arrMethodRatio.value.trim()}）`
      : method;
    const leaveText = leave === "その他" ? `その他：${arrLeaveOther.value.trim()}` : leave;
    const rightsText = rights === "その他" ? `その他：${arrRightsOther.value.trim()}` : rights;
    return { method: methodText, detail: arrDetail.value.trim(), leave: leaveText, rights: rightsText };
  }

  function validateAgreement() {
    agreeSubmit.disabled = !(agreeSelection && collectArrangement());
  }

  agreeSubmit.addEventListener("click", () => {
    const code = agreeFor;
    const tpl = AGREEMENT_TEMPLATES.find((t) => t.id === agreeSelection);
    const arrangement = collectArrangement();
    const entry = state.get(code);
    const profile = profileByCode.get(code);
    if (!entry || !tpl || !arrangement || !profile || entry.agreement) return;

    entry.agreement = tpl.name;
    entry.arrangement = arrangement;
    if (entry.messages.length === 0) {
      entry.messages.push({ from: "system", text: `${profile.name}さんとマッチしました。` });
    }
    entry.messages.push({ from: "system", text: `「${tpl.name}」で合意し、配分の取り決めを記録しました。挨拶を送ってみましょう。` });

    syncStampButtons(code);
    addMatchRow(code);
    updateMatchPreview(code);
    persist();

    agreeFor = null;
    agreeSelection = null;
    closeOverlay(agreeOverlay);
    openChat(code);
  });

  /* ---------------------------------------------------------------
     matches list ― agreement済みのみ。合意テンプレ名をバッジ表示
  --------------------------------------------------------------- */
  const matchesEmpty = document.getElementById("matches-empty");
  const matchesList = document.getElementById("matches-list");

  function addMatchRow(code) {
    if (document.querySelector(`.match-row[data-code="${code}"]`)) return;
    const profile = profileByCode.get(code);
    const entry = state.get(code);
    if (!profile || !entry || !entry.agreement) return;
    matchesEmpty.hidden = true;

    const a = entry.arrangement;
    const termsHTML = a ? `
      <dl class="match-row__terms">
        <div><dt>収益分配</dt><dd>${escapeHTML(a.method)}</dd></div>
        <div><dt>取り決め</dt><dd>${escapeHTML(a.detail)}</dd></div>
        <div><dt>離脱時</dt><dd>${escapeHTML(a.leave)}</dd></div>
        <div><dt>権利</dt><dd>${escapeHTML(a.rights)}</dd></div>
      </dl>` : "";

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="match-row" data-code="${code}">
        <div class="match-row__head">
          <span class="match-row__icon">${iconSVG(profile.icon)}</span>
          <div class="match-row__id">
            <p class="match-row__name">${profile.name}</p>
            <span class="match-row__badge">${escapeHTML(entry.agreement)}</span>
          </div>
          <button class="match-row__button" type="button" data-code="${code}">メッセージ</button>
        </div>
        ${termsHTML}
        <p class="match-row__preview" data-preview>まだメッセージはありません。</p>
      </div>
    `;
    matchesList.appendChild(li);
    li.querySelector(".match-row__button").addEventListener("click", () => openChat(code));
  }

  function updateMatchPreview(code) {
    const entry = state.get(code);
    const preview = document.querySelector(`.match-row[data-code="${code}"] [data-preview]`);
    if (!preview || entry.messages.length === 0) return;
    const visible = entry.messages.filter((m) => m.from !== "system");
    const last = visible.length ? visible[visible.length - 1] : entry.messages[entry.messages.length - 1];
    preview.textContent = (last.from === "you" ? "自分: " : "") + last.text;
  }

  /* ---------------------------------------------------------------
     chat panel
  --------------------------------------------------------------- */
  const chatOverlay = document.getElementById("chat-overlay");
  const chatIcon = document.getElementById("chat-icon");
  const chatName = document.getElementById("chat-name");
  const chatCode = document.getElementById("chat-code");
  const chatLog = document.getElementById("chat-log");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  let chatOpenFor = null;

  function bubbleHTML(message) {
    const text = escapeHTML(message.text);
    if (message.from === "system") {
      return `<p class="bubble bubble--system">${text}</p>`;
    }
    const cls = message.from === "you" ? "bubble--you" : "bubble--them";
    return `<p class="bubble ${cls}">${text}</p>`;
  }

  function renderChatLog() {
    chatLog.innerHTML = state.get(chatOpenFor).messages.map(bubbleHTML).join("");
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function openChat(code) {
    const profile = profileByCode.get(code);
    const entry = state.get(code);
    if (!profile || !entry || !entry.agreement) return;
    chatOpenFor = code;

    chatIcon.innerHTML = iconSVG(profile.icon);
    chatName.textContent = profile.name;
    chatCode.textContent = profile.code;

    renderChatLog();
    openOverlay(chatOverlay, chatInput);
  }

  function showTyping() {
    const bubble = document.createElement("p");
    bubble.className = "bubble bubble--typing";
    bubble.id = "chat-typing";
    bubble.innerHTML = "<span></span><span></span><span></span>";
    chatLog.appendChild(bubble);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function sendMessage(text) {
    const code = chatOpenFor;
    const entry = state.get(code);
    entry.messages.push({ from: "you", text });
    renderChatLog();
    updateMatchPreview(code);
    persist();

    showTyping();
    window.setTimeout(() => {
      const typingEl = document.getElementById("chat-typing");
      if (typingEl) typingEl.remove();

      const profile = profileByCode.get(code);
      const reply = profile.replies[entry.replyIndex % profile.replies.length];
      entry.replyIndex += 1;
      // 返信はチャットを閉じていても記録される
      entry.messages.push({ from: "them", text: reply });
      persist();
      if (chatOpenFor === code && !chatOverlay.hidden) renderChatLog();
      updateMatchPreview(code);
    }, 1100);
  }

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = "";
    sendMessage(text);
  });

  /* ---------------------------------------------------------------
     showcase ― dummy success stories + SNS feature CTA
  --------------------------------------------------------------- */
  const SHOWCASE_ITEMS = [
    { title: "深夜のコンビニ発、短編ホラー小説アプリ", icon: "novel",
      crew: [["卯月ネム", "企画・原作"], ["御堂アキラ", "エンジニア"]] },
    { title: "駅の音だけで街を当てるクイズ", icon: "sound",
      crew: [["東雲コウ", "企画"], ["綾城ハヤト", "エンジニア"], ["夜久ツバサ", "ライター"]] },
    { title: "捨てられた傘に、第二の人生を。", icon: "eco",
      crew: [["柊ミカゲ", "企画"], ["深津ワタル", "デザイナー"]] },
  ];

  function renderShowcase() {
    const list = document.getElementById("showcase-list");
    list.innerHTML = SHOWCASE_ITEMS.map((item) => `
      <li class="showcase-card">
        <span class="showcase-card__badge">公式SNSで紹介されました</span>
        <p class="showcase-card__title">${item.title}</p>
        <ul class="showcase-card__crew">
          ${item.crew.map(([name, role]) => `<li><b>${name}</b> / ${role}</li>`).join("")}
        </ul>
      </li>
    `).join("");
  }

  document.getElementById("showcase-cta-button").addEventListener("click", () => {
    document.getElementById("showcase-cta-note").hidden = false;
  });

  /* ---------------------------------------------------------------
     partners ― pre-registration form
     window.TANEWAZA_CONFIG.formspreeEndpoint が設定されていれば
     Formspree に送信し、未設定ならダミー動作（送信なし）
  --------------------------------------------------------------- */
  const partnersForm = document.getElementById("partners-form");
  const partnersConfirm = document.getElementById("partners-confirm");
  const partnersError = document.getElementById("partners-error");
  const formspreeEndpoint = (window.TANEWAZA_CONFIG || {}).formspreeEndpoint || "";

  partnersForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    partnersError.hidden = true;

    if (!formspreeEndpoint) {
      partnersForm.hidden = true;
      partnersConfirm.hidden = false;
      return;
    }

    const submitBtn = partnersForm.querySelector(".partners__submit");
    submitBtn.disabled = true;
    submitBtn.textContent = "送信中…";

    try {
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        body: new FormData(partnersForm),
        headers: { Accept: "application/json" },
      });
      // Formspree はバリデーション失敗時 200 + {ok:false, errors:[...]} を返すことがある
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) {
        const detail = Array.isArray(data.errors)
          ? data.errors.map((e) => e.message).join(", ")
          : `HTTP ${res.status}`;
        throw new Error(`Formspree: ${detail}`);
      }
      partnersForm.hidden = true;
      partnersConfirm.textContent = "事前登録ありがとうございます。内容を確認のうえ、ご連絡いたします。";
      partnersConfirm.hidden = false;
    } catch (err) {
      console.error("[partners] Formspree送信エラー:", err);
      partnersError.hidden = false;
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "事前登録する";
    }
  });

  /* ---------------------------------------------------------------
     init ― render + restore persisted matches (合意済みのみ)
  --------------------------------------------------------------- */
  renderProjects();
  renderRoleFilter();
  renderCreators();
  renderShowcase();

  allProfiles.forEach((p) => {
    const entry = state.get(p.code);
    if (entry.agreement) {
      addMatchRow(p.code);
      updateMatchPreview(p.code);
    }
  });
})();
