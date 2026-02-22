// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initializeSelectors();
    setupEventListeners();
});

// State Management
const state = {
    currentPage: 'search',
    searchResults: [],
    selectedBook: null,
    myBooks: [],
    myPosts: [],
    posts: [
        { id: 101, user: "田中 太一", book: "イシューからはじめよ", content: "『犬の道』を避ける、という表現が秀逸。努力の量を誇るのではなく、価値のある問いに時間を割く勇気をもらいました。", likes: 42, timestamp: "2時間前" },
        { id: 102, user: "佐藤 優香", book: "考える技術・書く技術", content: "SCQ法を使ってレポートを書いたら、上司から『非常にわかりやすい』と褒められました！", likes: 28, timestamp: "5時間前" },
        { id: 103, user: "伊藤 健", book: "イシューからはじめよ", content: "仮説を立てる段階で、どれだけアウトプットのイメージを具体化できるかが勝負ですね。", likes: 15, timestamp: "1日前" }
    ]
};

// Ultimate AI Analysis Registry (Specific insights and structure types)
const bookAnalysisRegistry = {
    '1': {
        title: 'イシューからはじめよ',
        author: '安宅 和人',
        summary: `　世の中には「努力しているのに結果が出ない人」と「圧倒的な成果を出す人」がいます。その決定的な違いは能力の差ではなく、「解くべき問い（イシュー）」の選び方にあります。

　多くの人は、100個の問題があれば100個全部を解こうとして「犬の道」に迷い込みます。しかし、本当に解決すべき本質的な問題は、全体の1%〜2%程度しかありません。この本は、そのたった一つの「黄金の鍵」を見つけ、そこにエネルギーを集中させる「知的生産の技術」を説いています。

　「悩む」のではなく「考える」。答えが出ないことに頭を抱えるのは、単に停滞しているだけであり、プロフェッショナルとは言えません。答えを出すための材料を探し、仮説を立て、目に見える証拠を積み上げる。このプロセスを繰り返すことで、最小の力で最大の結果を出すことが可能になります。

　つまり、この本は「忙しさ」を正当化することを禁じ、あなたに「賢く立ち止まり、本当に大切なことだけに命を燃やす」ことを要求する、全てのビジネスパーソン必読のバイブルです。`,
        analogy: "「霧の中の迷路でむやみに走り回るのではなく、まず高い場所に登って、出口に続く唯一の道を見つけること」に似ています。道がわかれば、歩くスピードが遅くても必ずゴールに辿り着けます。",
        structureType: 'flow',
        structureNodes: [
            { label: '① イシュードリブン', text: '「解くべき問い」を定義する。PCを開く前に、何に白黒つけるのかを明確にする。' },
            { label: '② 仮説ドリブン', text: 'スタンスを取る。「たぶんこうなる」という仮説を立て、必要な分析を逆算する。' },
            { label: '③ アウトプットドリブン', text: '「答え」を出す。空中戦を避け、証拠となるデータを積み上げる。' },
            { label: '④ メッセージドリブン', text: '「伝える」。相手の脳内に同じピラミッド構造を組み上げる。' }
        ],
        actions: [
            'PCを開く前に、付箋に「今日、絶対に答えを出すべき問い」を1つだけ書く',
            '会議が始まったら「今日のゴールは何か、何が決まれば成功か」を最初に握る',
            '分析を始める前に、想定されるグラフの形（ラフ）を紙に描いてみる'
        ],
        keywords: ['知的生産', '逆算思考', '本質主義', '生産性'],
        communityInsignt: "「犬の道」という言葉への共感が多い。努力の質を問う姿勢が、多くのビジネスパーソンに刺さっている。"
    },
    '2': {
        title: '考える技術・書く技術',
        author: 'バーバラ・ミント',
        summary: `　「話が長い」「何が言いたいかわからない」――そんなコミュニケーションの不全を解決する、思考整理術の金字塔です。

　核心は「ピラミッド原則」にあります。私たちの脳は、バラバラの情報をそのまま受け取ることが苦手です。しかし、情報が「結論」から始まり、それを支える「根拠」が論理的に配置された階層構造になっていれば、驚くほどスムーズに理解できます。

　この本では、情報の整理を「ライティング」だけの問題とせず、そもそも脳の中で情報がどう整理されているかという「思考」のプロセスから問い直します。導入部で相手の疑問を呼び起こし、次にその疑問に答える形でピラミッドを下りていく「SCQ法」は、あらゆるビジネス現場で一生使える武器となるはずです。`,
        analogy: "「散らかったおもちゃを箱に詰め込むのではなく、似たもの同士をまとめて『積み木コーナー』『人形コーナー』と分類し、一番上に『遊び場』という看板を立てる」ようなものです。",
        structureType: 'pyramid',
        structureNodes: {
            top: 'ピラミッドの頂点には「相手の疑問に答える結論」を置く',
            reasons: [
                '情報を常に一つのグループにまとめる',
                '各グループ内の情報は、演繹的または帰納的な順序で並べる',
                '一つのグループの要約は、その一つ下の階層の情報の総和にする'
            ]
        },
        actions: [
            'メールの冒頭1行で結論を言い切る',
            '「理由は3つあります」のように、先に階層の数を宣言する',
            '書く前に、白い紙に情報の「箱」を描いて、論理の漏れや重複がないかチェックする'
        ],
        keywords: ['ロジカルシンキング', 'ライティング', '情報の整理'],
        communityInsignt: "「SCQ法」が実用的すぎると評判。報告書の構成が劇的に変わったという声が多数。"
    },
    '3': {
        title: '人を動かす',
        author: 'デール・カーネギー',
        summary: `　人間関係の本質を説き、世界で最も読まれている自己啓発のバイブルです。この本が教えるのは、単なるテクニックではなく、他者への深い尊敬と関心に基づいた「影響力」のあり方です。

　「批判をせず、心からの賞賛を与える」「相手の関心の中心にあるものを話題にする」。これらの原則は、一見シンプルに見えますが、実践するのは容易ではありません。なぜなら、私たちは本能的に「自分の正しさ」を主張したがる生き物だからです。

　カーネギーは、相手を無理に従わせるのではなく、相手が「自ら動きたくなる」ような環境を作ることの重要性を説いています。その鍵は、相手の自尊心を尊重し、相手に重要感を持たせることにあります。時代を超えて普遍的な価値を持ち続ける、人間理解の決定版と言える一冊です。`,
        analogy: "「魚を釣りたいなら、自分の好きなイチゴではなく、魚の好きなミミズを餌につける」という考え方です。相手が何を求めているかを知り、それを満たすことで道が開けます。",
        structureType: 'matrix',
        structureNodes: [
            { title: '三原則', content: '批判しない、賞賛する、強い欲求を起こさせる' },
            { title: '好かれる方法', content: '誠実な関心を寄せる、笑顔、名前を覚える' },
            { title: '説得する方法', content: '議論を避ける、間違いを認めさせる、Yesと言わせる' }
        ],
        actions: [
            '今日会う人の「良いところ」を一つ見つけ、本心から褒める',
            '相手の間違いを指摘したくなったら、一言飲み込んで「なるほど」から始める',
            '会話中、相手が話し終えるまで遮らずに聞き、相手の関心事について質問する'
        ],
        keywords: ['人間関係', 'リーダーシップ', '自尊心', 'コミュニケーション'],
        communityInsignt: "多くの人が「もっと早く読みたかった」と語る名著。人間心理の複雑さと美しさを再認識させられる内容。"
    }
};

// Global Selectors
let searchInput, resultsGrid, analysisView, btnSearch;

function initializeSelectors() {
    searchInput = document.getElementById('book-search-input');
    resultsGrid = document.getElementById('search-results');
    analysisView = document.getElementById('analysis-section');
    btnSearch = document.getElementById('btn-search');
}

function setupEventListeners() {
    if (btnSearch) btnSearch.addEventListener('click', performSearch);
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    ['search', 'community', 'study'].forEach(id => {
        const el = document.getElementById(`nav-${id}`);
        if (el) el.addEventListener('click', () => switchPage(id));
    });

    const btnPublish = document.getElementById('btn-post-publish');
    if (btnPublish) btnPublish.addEventListener('click', publishInsight);

    switchPage('search');
}

function switchPage(pageId) {
    state.currentPage = pageId;
    ['search', 'community', 'study'].forEach(id => {
        const page = document.getElementById(`page-${id}`);
        const btn = document.getElementById(`nav-${id}`);
        if (page) page.classList.toggle('active', id === pageId);
        if (btn) btn.classList.toggle('active', id === pageId);
    });
    if (pageId === 'community') renderCommunityFeed();
    else if (pageId === 'study') renderStudyPage();
}

// Durable Search Implementation
async function performSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    resultsGrid.innerHTML = '<div class="loader-container"><div class="loader"></div><p>図書DBを横断検索中...</p></div>';
    resultsGrid.classList.remove('hidden');
    analysisView.classList.add('hidden');

    try {
        // 1. Internal Precision Match
        const internal = Object.keys(bookAnalysisRegistry)
            .filter(id => {
                const b = bookAnalysisRegistry[id];
                return b.title.includes(query) || b.keywords.some(k => k.includes(query));
            })
            .map(id => ({ ...bookAnalysisRegistry[id], id, isInternal: true, cover: null }));

        // 2. Fetch from APIs
        const apiBooks = await fetchAllAPIs(query);

        const merged = [...internal];
        apiBooks.forEach(apiBook => {
            if (!merged.some(m => m.title === apiBook.title)) merged.push(apiBook);
        });

        if (merged.length > 0) renderSearchResults(merged);
        else renderNoResults(query);
    } catch (e) {
        console.error("Search Fatal:", e);
        renderNoResults(query, true);
    }
}

async function fetchAllAPIs(query) {
    let results = [];

    // Google Books
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`);
        const data = await res.json();
        if (data.items) {
            results = data.items.map(item => ({
                id: item.id,
                title: item.volumeInfo.title,
                author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : '不明',
                cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
                isInternal: false
            }));
        }
    } catch (e) { console.warn("Google API error"); }

    // Fallback: Open Library
    if (results.length === 0) {
        try {
            const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`);
            const data = await res.json();
            if (data.docs) {
                results = data.docs.map(doc => ({
                    id: doc.key,
                    title: doc.title,
                    author: doc.author_name ? doc.author_name[0] : '不明',
                    cover: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
                    isInternal: false
                }));
            }
        } catch (e) { console.warn("OpenLibrary error"); }
    }

    return results;
}

function renderSearchResults(books) {
    resultsGrid.innerHTML = '';
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card-premium';
        card.innerHTML = `
            <div class="card-cover-wrapper">
                ${book.cover ? `<img src="${book.cover}" alt="${book.title}">` : `<div class="placeholder-cover"><span>${book.title[0]}</span></div>`}
                ${book.isInternal ? '<span class="ribbon">Deep Analysis</span>' : ''}
            </div>
            <div class="card-content">
                <h4>${book.title}</h4>
                <p>${book.author}</p>
            </div>
        `;
        card.addEventListener('click', () => showAnalysis(book));
        resultsGrid.appendChild(card);
    });
}

function renderNoResults(query, isError = false) {
    resultsGrid.innerHTML = `
        <div class="error-panel">
            <h3><i data-lucide="alert-triangle"></i> ${isError ? '通信エラー' : '直接の結果が見つかりません'}</h3>
            <p>下記リンクより直接検索いただけます：</p>
            <div class="external-search-btns">
                <a href="https://calil.jp/search?q=${encodeURIComponent(query)}" target="_blank" class="btn-ext calil">カーリルで探す</a>
                <a href="https://www.amazon.co.jp/s?k=${encodeURIComponent(query)}&i=digital-text" target="_blank" class="btn-ext kindle">Amazon</a>
                <a href="https://www.google.com/search?q=${encodeURIComponent(query)}+要約" target="_blank" class="btn-ext google">Googleで深掘り</a>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function showAnalysis(book) {
    state.selectedBook = book;
    document.querySelector('.search-hero').classList.add('hidden');
    document.querySelector('.search-container').classList.add('hidden');
    resultsGrid.classList.add('hidden');
    analysisView.classList.remove('hidden');
    renderAnalysisPage(book);
    window.scrollTo(0, 0);
}

function renderAnalysisPage(book) {
    let info = bookAnalysisRegistry[book.id];
    if (!info) {
        const intId = Object.keys(bookAnalysisRegistry).find(id => book.title.includes(bookAnalysisRegistry[id].title));
        info = intId ? bookAnalysisRegistry[intId] : generateMockAnalysis(book);
    }

    const personalStatus = state.myBooks.find(b => b.id === book.id)?.status || 'none';
    const relatedPosts = state.posts.filter(p => p.book.includes(book.title.substring(0, 4)));

    analysisView.innerHTML = `
        <div class="analysis-nav">
            <button class="btn-icon-text" onclick="hideAnalysis()"><i data-lucide="arrow-left"></i> 戻る</button>
            <div class="status-controls">
                <button class="btn-status ${personalStatus === 'want' ? 'active' : ''}" onclick="updateStatus('${book.id}', 'want')">読みたい</button>
                <button class="btn-status ${personalStatus === 'reading' ? 'active' : ''}" onclick="updateStatus('${book.id}', 'reading')">読書中</button>
                <button class="btn-status ${personalStatus === 'done' ? 'active' : ''}" onclick="updateStatus('${book.id}', 'done')">読んだ</button>
            </div>
        </div>

        <div class="analysis-hero-section">
            <div class="analysis-side">
                ${book.cover ? `<img src="${book.cover}" class="main-cover">` : `<div class="large-placeholder">${book.title[0]}</div>`}
            </div>
            <div class="analysis-main-info">
                <h1>${book.title}</h1>
                <p class="author-name">${book.author}</p>
                <div class="impact-quote">「${info.summary.split('。')[0]}」</div>
            </div>
        </div>

        <div class="analysis-grid">
            <div class="main-column">
                <section class="analysis-block">
                    <h3>エグゼクティブ・サマリー</h3>
                    <div class="summary-body">${info.summary.split('\n\n').map(p => `<p>${p}</p>`).join('')}</div>
                </section>
                <section class="analysis-block">
                    <h3>論理構造</h3>
                    ${renderVisualStructure(info)}
                </section>
                <section class="analysis-block">
                    <h3>💡 つまり…（たとえ話）</h3>
                    <div class="analogy-box">${info.analogy || '準備中...'}</div>
                </section>
            </div>
            <div class="side-column">
                <section class="analysis-block">
                    <h4>実践アクション</h4>
                    <ul style="padding-left:1.2rem; font-size:0.9rem;">${(info.actions || []).map(a => `<li style="margin-bottom:0.5rem">${a}</li>`).join('')}</ul>
                </section>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function renderVisualStructure(info) {
    if (info.structureType === 'flow') {
        return `<div style="display:flex;flex-direction:column;gap:0.75rem">${info.structureNodes.map(n => `<div style="background:#f8fafc;padding:0.75rem;border-radius:4px;border:1px solid var(--border)"><b>${n.label}</b><p style="font-size:0.85rem">${n.text}</p></div>`).join('')}</div>`;
    } else if (info.structureType === 'matrix') {
        return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem">${info.structureNodes.map(n => `<div style="background:#f8fafc;padding:0.75rem;border-radius:4px;border:1px solid var(--border)"><b>${n.title}</b><p style="font-size:0.85rem">${n.content}</p></div>`).join('')}</div>`;
    } else {
        const data = info.structureNodes || { top: '主旨', reasons: ['根拠1', '根拠2'] };
        return `<div class="logic-pyramid"><div class="pyramid-top"><p>${data.top}</p></div><div class="pyramid-base">${(data.reasons || []).map(r => `<div class="pyramid-node">${r}</div>`).join('')}</div></div>`;
    }
}

function generateMockAnalysis(book) {
    return {
        summary: `　「${book.title}」は、${book.author}氏によって書かれた、現代のリーダーシップと自己成長を問い直す一冊です。内容を体系的に理解することで、あなたの目的に対する具体的なアプローチが可能になります。`,
        analogy: "「航海に出る前に、地図を見るだけでなく、潮の流れや風の読み方を学ぶこと」に似ています。",
        structureType: 'pyramid',
        structureNodes: { top: `${book.title}の本質`, reasons: ['現状の把握', '優先順位の確立', '具体的な実行'] },
        actions: ['主要概念を図解する', '明日から一つ応用する'],
        keywords: ['自己啓発'],
        communityInsignt: "この本の核心部分への共感が多数寄せられています。"
    };
}

function hideAnalysis() {
    document.querySelector('.search-hero').classList.remove('hidden');
    document.querySelector('.search-container').classList.remove('hidden');
    resultsGrid.classList.remove('hidden');
    analysisView.classList.add('hidden');
}

function updateStatus(bookId, status) {
    const bookIndex = state.myBooks.findIndex(b => b.id === bookId);
    if (bookIndex >= 0) state.myBooks[bookIndex].status = status;
    else if (state.selectedBook) state.myBooks.push({ ...state.selectedBook, status, timestamp: Date.now() });
    renderAnalysisPage(state.selectedBook);
}

function publishInsight() {
    const content = document.getElementById('study-post-input').value.trim();
    if (!content) return;
    const post = { id: Date.now(), user: "あなた", book: document.getElementById('study-post-book-select').value || "読書の断片", content, likes: 0, timestamp: "たった今" };
    state.myPosts.unshift(post);
    state.posts.unshift(post);
    renderMyPosts();
    alert('インサイトを投稿しました！');
}

function renderCommunityFeed() {
    const feed = document.getElementById('community-feed');
    if (feed) feed.innerHTML = state.posts.map(p => `
        <div class="card post-card" style="padding:1rem; border:1px solid var(--border); border-radius:8px; margin-bottom:1rem; background:white;">
            <div style="font-size:0.8rem;color:var(--text-muted)"><b>${p.user}</b> • ${p.timestamp}</div>
            <div style="color:var(--primary);font-size:0.85rem;font-weight:700;margin:0.2rem 0"># ${p.book}</div>
            <p style="font-size:0.9rem">${p.content}</p>
        </div>
    `).join('');
}

function renderStudyPage() { renderBookshelf(); renderMyPosts(); updateBookSelect(); }

function renderBookshelf() {
    const shelf = document.getElementById('study-bookshelf');
    if (!shelf) return;

    const countDisplay = document.getElementById('study-book-count');
    const doneCount = state.myBooks.filter(b => b.status === 'done').length;
    const readingCount = state.myBooks.filter(b => b.status === 'reading').length;
    const wantCount = state.myBooks.filter(b => b.status === 'want').length;

    countDisplay.innerHTML = `
        <span class="stat-badge done">完了 ${doneCount}</span>
        <span class="stat-badge reading">挑戦中 ${readingCount}</span>
        <span class="stat-badge want">興味 ${wantCount}</span>
    `;

    if (state.myBooks.length === 0) {
        shelf.innerHTML = '<div class="empty-shelf-view"><i data-lucide="library"></i><p>本棚は空です。良い本を見つけて登録しましょう。</p></div>';
    } else {
        const statuses = [
            { id: 'reading', label: '現在読み込み中' },
            { id: 'want', label: 'いつか読みたい' },
            { id: 'done', label: '思考の糧とした本' }
        ];

        shelf.innerHTML = statuses.map(s => {
            const books = state.myBooks.filter(b => b.status === s.id);
            if (books.length === 0) return '';
            return `
                <div class="shelf-group">
                    <h4 class="shelf-group-title"><span class="dot-${s.id}"></span> ${s.label}</h4>
                    <div class="shelf-grid-mini">
                        ${books.map(b => `
                            <div class="shelf-item-v2" onclick="showAnalysis(${JSON.stringify(b).replace(/"/g, '&quot;')})">
                                <div class="shelf-v2-cover">
                                    ${b.cover ? `<img src="${b.cover}">` : `<div class="mini-placeholder">${b.title[0]}</div>`}
                                </div>
                                <div class="shelf-v2-info">
                                    <h5>${b.title}</h5>
                                    <p>${b.author}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('') || '<p class="empty-shelf-text">まだ登録された本がありません。</p>';
    }
    lucide.createIcons();
}

function renderMyPosts() {
    const list = document.getElementById('study-my-posts');
    if (!list) return;
    if (state.myPosts.length === 0) {
        list.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;">まだ投稿がありません。</p>';
        return;
    }
    list.innerHTML = state.myPosts.map(p => `
        <div class="my-post-card">
            <div class="my-post-book"># ${p.book}</div>
            <p class="my-post-content">${p.content}</p>
            <div class="my-post-time">${p.timestamp}</div>
        </div>
    `).join('');
}

function updateBookSelect() {
    const select = document.getElementById('study-post-book-select');
    if (select) {
        const options = state.myBooks.map(b => `<option value="${b.title}">${b.title}</option>`).join('');
        select.innerHTML = '<option value="">書籍を選択（任意）</option>' + options;
    }
}
