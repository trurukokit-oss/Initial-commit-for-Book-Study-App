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
    myBooks: [], // { id, title, author, cover, status: 'want'|'reading'|'done', timestamp }
    myPosts: [], // { id, user, book, content, likes, timestamp }
    posts: [
        { id: 101, user: "田中 太一", book: "イシューからはじめよ", content: "『犬の道』を避ける、という表現が秀逸。努力の量を誇るのではなく、価値のある問いに時間を割く勇気をもらいました。", likes: 42, timestamp: "2時間前" },
        { id: 102, user: "佐藤 優香", book: "考える技術・書く技術", content: "SCQ法を使ってレポートを書いたら、上司から『非常にわかりやすい』と褒められました！", likes: 28, timestamp: "5時間前" },
        { id: 103, user: "伊藤 健", book: "イシューからはじめよ", content: "仮説を立てる段階で、どれだけアウトプットのイメージを具体化できるかが勝負ですね。", likes: 15, timestamp: "1日前" }
    ]
};

// Ultimate AI Analysis Registry (Rich, Structured Content)
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
        communityInsignt: "「犬の道」という、単なる努力の積み上げを批判する言葉に衝撃を受ける人が続出。本質を見極める勇気への共感が多い。"
    },
    '2': {
        title: '考える技術・書く技術',
        author: 'バーバラ・ミント',
        summary: `　「話が長い」「何が言いたいかわからない」――そんなコミュニケーションの不全を解決する、世界最高峰の思考整理術です。著者のバーバラ・ミントは、マッキンゼー初の女性コンサルタントとして、情報の「並べ方」が人の理解を左右することを発見しました。

　核心は「ピラミッド原則」にあります。私たちの脳は、バラバラの情報をそのまま受け取ることができません。しかし、情報が「結論」から始まり、それを支える「根拠」が論理的に配置された階層構造になっていれば、驚くほどスムーズに理解できます。

　この本では、情報の整理を「ライティング」だけの問題とせず、そもそも脳の中で情報がどう整理されているかという「思考」のプロセスから問い直します。導入部で相手の疑問を呼び起こし、次にその疑問に答える形でピラミッドを下りていく「SCQ法」は、あらゆるビジネス現場で一生使える武器となるはずです。`,
        analogy: "「散らかったおもちゃを箱に詰め込むのではなく、似たもの同士をまとめて『積み木コーナー』『人形コーナー』と分類し、一番上に『遊び場』という看板を立てる」ようなものです。整理されていれば、どこに何があるか一瞬でわかります。",
        structureType: 'pyramid',
        structureNodes: {
            top: 'ピラミッドの頂点には「相手の疑問に答える結論」を置く',
            reasons: [
                '情報の重要度が同じものを、常に一つのグループにまとめる',
                '各グループ内の情報は、演繹的または帰納的な順序で並べる',
                '一つのグループの要約は、その一つ下の階層の情報の総和にする'
            ]
        },
        actions: [
            'メールの冒頭1行で結論（件名の回答）を言い切る',
            '「理由は3つあります」のように、先に階層の数を宣言する',
            '書く前に、白い紙に情報の「箱」を描いて、論理の漏れや重複がないかチェックする'
        ],
        keywords: ['ロジカルシンキング', 'ライティング', 'マッキンゼー', '情報の整理'],
        communityInsignt: "「SCQ法（状況・困難・疑問）」が実用的すぎると評判。報告書の構成がガラリと変わったという声が多数。"
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

    // Initial Load
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

// Robust Multi-Stage Search
async function performSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    resultsGrid.innerHTML = '<div class="loader-container"><div class="loader"></div><p>深い知の海を探索中...</p></div>';
    resultsGrid.classList.remove('hidden');
    analysisView.classList.add('hidden');

    try {
        const internal = Object.keys(bookAnalysisRegistry)
            .filter(id => {
                const b = bookAnalysisRegistry[id];
                return b.title.includes(query) || b.keywords.some(k => k.includes(query));
            })
            .map(id => ({ ...bookAnalysisRegistry[id], id, isInternal: true, cover: null }));

        const apiResults = await fetchBooks(query);
        const merged = [...internal];
        apiResults.forEach(apiBook => {
            if (!merged.some(m => m.title === apiBook.title)) merged.push(apiBook);
        });

        if (merged.length > 0) renderSearchResults(merged);
        else renderNoResults(query);
    } catch (e) {
        renderNoResults(query, true);
    }
}

async function fetchBooks(query) {
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=12`);
        const data = await res.json();
        return (data.items || []).map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : '不明',
            cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
            categories: item.volumeInfo.categories || [],
            isInternal: false
        }));
    } catch (e) { return []; }
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
            <h3><i data-lucide="search-x"></i> ${isError ? '通信が制限されています' : '直接のデータは見つかりませんでした'}</h3>
            <p>外部サイトで詳しく探してみましょう：</p>
            <div class="external-search-btns">
                <a href="https://www.amazon.co.jp/s?k=${encodeURIComponent(query)}&i=digital-text" target="_blank" class="btn-ext kindle">Amazon Kindle</a>
                <a href="https://www.google.com/search?q=${encodeURIComponent(query)}+書籍+要約" target="_blank" class="btn-ext google">Googleで深掘り</a>
            </div>
        </div>
    `;
    lucide.createIcons();
}

// Ultimate Analysis Rendering
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
        // Find by title if not by ID
        const intId = Object.keys(bookAnalysisRegistry).find(id => book.title.includes(bookAnalysisRegistry[id].title));
        info = intId ? bookAnalysisRegistry[intId] : generateMockAnalysis(book);
    }

    const personalStatus = state.myBooks.find(b => b.id === book.id)?.status || 'none';
    const relatedPosts = state.posts.filter(p => p.book.includes(book.title.substring(0, 4)));

    analysisView.innerHTML = `
        <div class="analysis-nav">
            <button class="btn-icon-text" onclick="hideAnalysis()"><i data-lucide="arrow-left"></i> 検索に戻る</button>
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
                <div class="badge-row">${(info.keywords || []).map(k => `<span class="k-badge"># ${k}</span>`).join('')}</div>
                <h1>${book.title}</h1>
                <p class="author-name">${book.author}</p>
                <div class="impact-quote">「${info.summary.split('。')[0]}」</div>
            </div>
        </div>

        <div class="analysis-grid">
            <div class="main-column">
                <section class="analysis-block">
                    <h3><i data-lucide="book-open"></i> エグゼクティブ・サマリー</h3>
                    <div class="summary-body">${info.summary.split('\n\n').map(p => `<p>${p}</p>`).join('')}</div>
                </section>

                <section class="analysis-block">
                    <h3><i data-lucide="git-branch"></i> 論理構造解剖</h3>
                    <div class="structure-visual-container">
                        ${renderVisualStructure(info)}
                    </div>
                </section>

                <section class="analysis-block">
                    <h3><i data-lucide="sparkles"></i> 誰でもわかる「たとえ話」</h3>
                    <div class="analogy-box">
                        <p>${info.analogy || '準備中...'}</p>
                    </div>
                </section>
            </div>

            <div class="side-column">
                <section class="analysis-block mini">
                    <h4><i data-lucide="zap"></i> 実践アクション</h4>
                    <ul class="action-list">
                        ${(info.actions || []).map(a => `<li>${a}</li>`).join('')}
                    </ul>
                </section>

                <section class="analysis-block mini">
                    <h4><i data-lucide="users"></i> コミュニティ・インサイト</h4>
                    <p class="community-summary">${info.communityInsignt || '注目の解釈を収集中...'}</p>
                    <div class="mini-feed">
                        ${relatedPosts.map(p => `<div class="mini-post"><b>${p.user}</b>: ${p.content.substring(0, 30)}...</div>`).join('')}
                    </div>
                </section>

                <button class="btn-primary-full" onclick="switchPage('community')">この本の議論に参加する</button>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function renderVisualStructure(info) {
    if (info.structureType === 'flow') {
        return `
            <div class="logic-flow">
                ${info.structureNodes.map((n, i) => `
                    <div class="flow-item">
                        <div class="flow-num">${i + 1}</div>
                        <div class="flow-content">
                            <strong>${n.label}</strong>
                            <p>${n.text}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (info.structureType === 'matrix') {
        return `
            <div class="logic-matrix">
                ${info.structureNodes.map(n => `
                    <div class="matrix-cell">
                        <h5>${n.title}</h5>
                        <p>${n.content}</p>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        // Pyramid
        const data = info.structureNodes || { top: '主旨', reasons: ['根拠1', '根拠2', '根拠3'] };
        return `
            <div class="logic-pyramid">
                <div class="pyramid-top">
                    <small>結論 / Core</small>
                    <p>${data.top}</p>
                </div>
                <div class="pyramid-connector"></div>
                <div class="pyramid-base">
                    ${(data.reasons || []).map((r, i) => `
                        <div class="pyramid-node">
                            <small>根拠 ${i + 1}</small>
                            <p>${r}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

function generateMockAnalysis(book) {
    return {
        summary: `　「${book.title}」は、${book.author}氏によって書かれた、現代のリーダーシップと自己成長を問い直す一冊です。内容を体系的に理解することで、あなたの目的に対する具体的なアプローチが可能になります。

　特筆すべきは、単なるスキルの習得にとどまらず、いかにしてそれを実務や日常生活に応用するかという「マインドセット」に焦点を当てている点です。複雑な情報を整理し、本質を見極めるというプロセスを通じて、あなたの生産性は劇的に向上するはずです。

　私たちは、日々の忙しさに追われ、つい「何が本当に大切か」を見失いがちです。しかし、この本は、一歩立ち止まって状況を俯瞰することの重要性を説いています。具体的な事例を交えながら、明日から使えるステップが丁寧に解説されています。`,
        analogy: "「航海に出る前に、地図を見るだけでなく、潮の流れや風の読み方を学ぶこと」に似ています。道具を使うテクニックよりも、その前提となる自然（本質）を知ることが成功への近道です。",
        structureType: 'pyramid',
        structureNodes: {
            top: `${book.title}の本質的価値の最大化`,
            reasons: ['現状の正確な把握と整理', '優先順位の確立と集中', '具体的な実行プランへの落とし込み']
        },
        actions: ['主要な概念を自分なりに図解してみる', '明日からのタスクに一つだけ応用する', '身近な人に学んだ内容をアウトプットする'],
        keywords: ['自己成長', 'ビジネススキル'],
        communityInsignt: "この本の核心部分について、多くのユーザーが「視点が変わった」と報告しています。具体的アクションへの期待が高い一冊です。"
    };
}

function hideAnalysis() {
    document.querySelector('.search-hero').classList.remove('hidden');
    document.querySelector('.search-container').classList.remove('hidden');
    resultsGrid.classList.remove('hidden');
    analysisView.classList.add('hidden');
}

// User Actions
function updateStatus(bookId, status) {
    const bookIndex = state.myBooks.findIndex(b => b.id === bookId);
    if (bookIndex >= 0) {
        state.myBooks[bookIndex].status = status;
    } else {
        if (state.selectedBook) {
            state.myBooks.push({ ...state.selectedBook, status, timestamp: Date.now() });
        }
    }
    renderAnalysisPage(state.selectedBook);
    alert(`${status === 'done' ? '読了' : status === 'reading' ? '読書中' : '読みたい本'}としてマークしました！`);
}

function publishInsight() {
    const content = document.getElementById('study-post-input').value.trim();
    const bookTitle = document.getElementById('study-post-book-select').value;
    if (!content) return;

    const newPost = {
        id: Date.now(),
        user: "あなた",
        book: bookTitle || "思考の整理",
        content: content,
        likes: 0,
        timestamp: "たった今"
    };
    state.myPosts.unshift(newPost);
    state.posts.unshift(newPost);
    document.getElementById('study-post-input').value = '';
    renderMyPosts();
    alert('インサイトを投稿しました！');
}

// Rendering Sections
function renderCommunityFeed() {
    const feed = document.getElementById('community-feed');
    if (!feed) return;
    feed.innerHTML = state.posts.map(p => `
        <div class="card post-card">
            <div class="post-header">
                <strong>${p.user}</strong>
                <span class="time">${p.timestamp}</span>
            </div>
            <div class="post-book-tag"># ${p.book}</div>
            <p class="post-body">${p.content}</p>
            <div class="post-footer">
                <span><i data-lucide="heart" style="width:14px"></i> ${p.likes}</span>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function renderStudyPage() {
    renderBookshelf();
    renderMyPosts();
    updateBookSelect();
}

function renderBookshelf() {
    const shelf = document.getElementById('study-bookshelf');
    if (!shelf) return;
    const countDisplay = document.getElementById('study-book-count');
    countDisplay.textContent = `${state.myBooks.length} 冊の知性`;

    if (state.myBooks.length === 0) {
        shelf.innerHTML = '<div class="empty-shelf-view"><i data-lucide="library"></i><p>本棚は空です。良い本を見つけて登録しましょう。</p></div>';
    } else {
        shelf.innerHTML = state.myBooks.map(b => `
            <div class="shelf-item" onclick="showAnalysis(${JSON.stringify(b).replace(/"/g, '&quot;')})">
                <div class="shelf-item-cover">
                    ${b.cover ? `<img src="${b.cover}">` : `<div class="mini-placeholder">${b.title[0]}</div>`}
                    <span class="status-dot ${b.status}"></span>
                </div>
                <h5>${b.title}</h5>
            </div>
        `).join('');
    }
    lucide.createIcons();
}

function renderMyPosts() {
    const list = document.getElementById('study-my-posts');
    if (!list) return;
    list.innerHTML = state.myPosts.map(p => `<div class="card post-card mini"><strong>${p.book}</strong><p>${p.content}</p></div>`).join('');
}

function updateBookSelect() {
    const select = document.getElementById('study-post-book-select');
    if (!select) return;
    select.innerHTML = '<option value="">書籍を選択</option>' +
        state.myBooks.map(b => `<option value="${b.title}">${b.title}</option>`).join('');
}
