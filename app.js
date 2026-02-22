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
    myBooks: [], // The virtual bookshelf
    myPosts: [], // Users's own insights
    posts: [
        {
            id: 1,
            user: "田中 太一",
            book: "イシューからはじめよ",
            content: "この本のピラミッド構造を意識すると、会議での発言が劇的に変わりました。特に『解くべき問い』の定義が重要だと再認識。",
            likes: 24,
            timestamp: "2時間前"
        },
        {
            id: 2,
            user: "佐藤 優香",
            book: "考える技術・書く技術",
            content: "導入部の『SCQ法』が非常に参考になります。他の方の解釈も知りたいです。",
            likes: 12,
            timestamp: "5時間前"
        }
    ]
};

// Advanced AI Analysis Registry (Specific insights and structure types)
const bookAnalysisRegistry = {
    '1': {
        title: 'イシューからはじめよ',
        author: '安宅 和人',
        summary: `　世の中には「努力しているのに結果が出ない人」と「涼しい顔をして圧倒的な成果を出す人」がいます。その違いはどこにあるのでしょうか？この本は、その答えを「やるべきことの選び方」にあると教えてくれます。

　私たちはついつい「100個の問題があれば、100個全部を一生懸命解こう」としてしまいます。しかし、実はその100個のうち、本当に解決する価値がある「本質的な問題」は2、3個しかありません。残りの90個以上は、たとえ解いたとしても状況はほとんど変わらない「偽の問題」なのです。この本では、そのたったひとつの「黄金の鍵」を見つけることを何よりも優先せよと説いています。

　例えば、迷路の中でむやみに走り回るのではなく、まず高いところから全体を眺めて「どの道が出口に繋がっているか」をじっくり見極める。もし出口に繋がっていない道だと分かったら、どんなに走りやすくてもそちらへは行かない。

　「犬のようにとにかく動く」のではなく、賢く立ち止まって「今、本当に考えるべきことは何か？」を自分に問いかける。この姿勢こそが、最小の力で最大の成果を生み出すプロフェッショナルの思考法です。難しい言葉を使えば「生産性」という話になりますが、要するに「無駄な努力を捨てて、本当に大切なことだけに命を燃やそう」という熱いメッセージが込められた本です。`,
        structureType: 'flow',
        structureData: [
            { label: '1. 「悩む」のをやめて「考える」', text: '答えが出ないことに頭を抱えるのではなく、答えを出すための材料を探す' },
            { label: '2. 本当の敵を見極める', text: '「今、白黒つけなきゃいけないこと」をたった一つに絞り込む' },
            { label: '3. 空中戦を避ける', text: '「たぶんこうなる」という仮説を立て、目に見える証拠だけを積み上げる' },
            { label: '4. 欲張らずにやり遂げる', text: 'あれもこれもと欲張らず、決めたことだけを完璧に形にする' }
        ],
        actions: [
            '【今日からできる】PCを開く前に、付箋に「今日、絶対に答えを出さなきゃいけない問い」を1つだけ書いてモニターに貼る',
            '【会議で使える】議論が迷走したら「そもそも、今この場では何を決めるのがゴールでしたっけ？」と一言声をかける',
            '【スライド作成】資料を作り始める前に、真っ白な紙に「伝えたい結論」を1行だけ書き、そこから逆算して必要な図解を5つだけ下書きする'
        ],
        keywords: ['やるべきことの整理', '逆算思考', '無駄を省く', '本質を見抜く'],
        imgConcept: '大きな暗闇 of the maze with a single spotlight on the correct exit.'
    },
    '2': {
        title: '考える技術・書く技術',
        author: 'バーバラ・ミント',
        summary: `　「話が長い」「結局何が言いたいかわからない」と言われたことはありませんか？この本は、そんな悩みを解決するための、情報の「並べ方」のバイブルです。私たちの頭は、バラバラの情報をそのまま受け取ることが苦手です。例えば、スーパーで「りんご、歯ブラシ、ほうれん草、石鹸、バナナ…」と10個並べられると覚えきれませんが、「果物グループ」と「日用品グループ」に分けて渡されれば、すんなり理解できます。

　この本が教えてくれる最大の秘訣は、情報を「ピラミッド」のように組み立てることです。一番てっぺんに「結論（一番言いたいこと）」を置き、そのすぐ下に、結論を支える「3つくらいの理由」をぶら下げます。さらにその下に、それぞれの理由を証明する具体的な事実を置いていきます。

　大切なのは、常に「読み手の頭の中にある疑問」に答える順番で並べることです。あなたが何かを言ったとき、相手の頭には必ず「なぜそう言えるの？」「具体的には？」という疑問が浮かびます。その疑問が浮かぶ瞬間に、ピラミッドの次の段の情報が差し出される。そんな魔法のような文章構成ができるようになれば、あなたの言葉は驚くほどスムーズに相手の心へ届くようになります。

　これは単なる文章術ではなく、相手の貴重な時間を奪わないための「思いやり」の技術でもあります。論理的であるということは、相手を迷わせないということ。情報の整理整頓を極めることで、あなたの信頼は劇的に高まるはずです。`,
        structureType: 'pyramid',
        structureData: {
            top: '「一番言いたいこと」から先に話し、その理由を3つ添える',
            reasons: [
                '相手が「なぜ？」と聞く前に、その答えを準備しておく',
                '似たもの同士をまとめて「要するに〇〇だ」と名前をつける',
                '上から下へ、問いと答えが繋がっているか確認する'
            ]
        },
        actions: [
            '【メール送信】上司へのメールは、1行目に「件名：【ご報告】結論より申し上げますと、A案に決定しました」と書く',
            '【説明のコツ】「ポイントは3つあります」と最初に宣言してから話し始める習慣をつける',
            '【資料作り】箇条書きを使うときは、必ず3〜5つ以内に収め、それ以上になるなら別のグループに分ける'
        ],
        keywords: ['わかりやすい説明', '情報の整理', '相手目線', 'ピラミッド思考'],
        imgConcept: 'Scattered stones becoming a beautiful tower by someone\'s hand.'
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

    const navSearch = document.getElementById('nav-search');
    const navCommunity = document.getElementById('nav-community');
    const navStudy = document.getElementById('nav-study');

    if (navSearch) navSearch.addEventListener('click', () => switchPage('search'));
    if (navCommunity) navCommunity.addEventListener('click', () => switchPage('community'));
    if (navStudy) navStudy.addEventListener('click', () => switchPage('study'));

    const btnPublish = document.getElementById('btn-post-publish');
    if (btnPublish) {
        btnPublish.addEventListener('click', publishInsight);
    }
}

// Navigation Logic
function switchPage(pageId) {
    state.currentPage = pageId;
    const pages = {
        search: document.getElementById('page-search'),
        community: document.getElementById('page-community'),
        study: document.getElementById('page-study')
    };
    const navBtns = {
        search: document.getElementById('nav-search'),
        community: document.getElementById('nav-community'),
        study: document.getElementById('nav-study')
    };

    Object.keys(pages).forEach(key => {
        if (!pages[key]) return;
        if (key === pageId) {
            pages[key].classList.add('active');
            navBtns[key].classList.add('active');
        } else {
            pages[key].classList.remove('active');
            navBtns[key].classList.remove('active');
        }
    });

    if (pageId === 'community') renderCommunityFeed();
    else if (pageId === 'study') renderStudyPage();
}

// Search Logic
async function performSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    resultsGrid.innerHTML = '<div class="loader">検索中...</div>';
    resultsGrid.classList.remove('hidden');
    analysisView.classList.add('hidden');

    try {
        // 1. Check Internal Registry
        const internalResults = [];
        Object.keys(bookAnalysisRegistry).forEach(id => {
            const book = bookAnalysisRegistry[id];
            if (book.title.includes(query) || query.includes(book.title.substring(0, 4))) {
                internalResults.push({
                    id: id,
                    title: book.title,
                    author: book.author || '不明',
                    cover: null,
                    isInternal: true
                });
            }
        });

        // 2. Fetch from Google Books API
        let apiResults = [];
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`);
            const data = await response.json();
            if (data.items) {
                apiResults = data.items.map(item => ({
                    id: item.id,
                    title: item.volumeInfo.title,
                    author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : '不明',
                    cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
                    categories: item.volumeInfo.categories || [],
                    description: item.volumeInfo.description || "",
                    isInternal: false
                }));
            }
        } catch (e) {
            console.warn("API Search failed, using internal/fallbacks only.");
        }

        const mergedResults = [...internalResults];
        apiResults.forEach(apiBook => {
            const isDuplicate = internalResults.some(intBook =>
                apiBook.title.includes(intBook.title) || intBook.title.includes(apiBook.title)
            );
            if (!isDuplicate) mergedResults.push(apiBook);
        });

        if (mergedResults.length > 0) {
            renderSearchResults(mergedResults);
        } else {
            renderFallbackUI(query);
        }
    } catch (error) {
        console.error("Search Error:", error);
        renderFallbackUI(query, true);
    }
}

function renderSearchResults(books) {
    resultsGrid.innerHTML = '';
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <div class="book-thumbnail-container">
                ${book.cover ? `<img src="${book.cover}" alt="${book.title}" class="book-thumbnail">` : `
                    <div class="placeholder-cover"><span>${book.title.substring(0, 1)}</span></div>
                `}
            </div>
            <div class="book-card-info">
                <h4>${book.title}</h4>
                <p>${book.author}</p>
                ${book.isInternal ? '<span class="badge-premium">プレミアム分析あり</span>' : ''}
            </div>
        `;
        card.addEventListener('click', () => showAnalysis(book));
        resultsGrid.appendChild(card);
    });

    // Add external link button at the end
    const lastCard = document.createElement('div');
    lastCard.className = 'fallback-mini-card';
    lastCard.innerHTML = `
        <p>もっと探す：</p>
        <div class="fallback-links-mini">
            <a href="https://www.amazon.co.jp/s?k=${encodeURIComponent(searchInput.value)}&i=digital-text" target="_blank">Kindle</a>
            <a href="https://www.google.com/search?q=${encodeURIComponent(searchInput.value)}+本+内容" target="_blank">Google</a>
        </div>
    `;
    resultsGrid.appendChild(lastCard);
}

function renderFallbackUI(query, isError = false) {
    resultsGrid.innerHTML = `
        <div class="fallback-container">
            <h3>${isError ? '通信エラーが発生しました' : '本が見つかりませんでした'}</h3>
            <p>外部のデータベースで直接検索するか、有名な書籍名でお試しください。</p>
            <div class="fallback-buttons">
                <a href="https://www.amazon.co.jp/s?k=${encodeURIComponent(query)}&i=digital-text" target="_blank" class="btn-fallback kindle">
                    <i data-lucide="external-link"></i> Kindleで探す
                </a>
                <a href="https://www.google.com/search?q=${encodeURIComponent(query)}+書籍+要約" target="_blank" class="btn-fallback google">
                    <i data-lucide="search"></i> Googleで検索
                </a>
                <a href="https://books.rakuten.co.jp/search?sitem=${encodeURIComponent(query)}" target="_blank" class="btn-fallback rakuten">
                    <i data-lucide="shopping-cart"></i> 楽天ブックス
                </a>
            </div>
            <div class="sample-queries">
                <p>おすすめのキーワード：</p>
                <div class="query-tags">
                    <span onclick="document.getElementById('book-search-input').value='イシューからはじめよ'; performSearch();"># イシューからはじめよ</span>
                    <span onclick="document.getElementById('book-search-input').value='考える技術'; performSearch();"># 考える技術</span>
                    <span onclick="document.getElementById('book-search-input').value='問いを立てる'; performSearch();"># 問いを立てる</span>
                </div>
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
    renderAnalysis(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideAnalysis() {
    document.querySelector('.search-hero').classList.remove('hidden');
    document.querySelector('.search-container').classList.remove('hidden');
    resultsGrid.classList.remove('hidden');
    analysisView.classList.add('hidden');
}

async function renderAnalysis(book) {
    const purpose = document.getElementById('purpose-input').value.trim() || "自己成長とキャッチアップ";
    let info = bookAnalysisRegistry[book.id];
    if (!info) {
        const intId = Object.keys(bookAnalysisRegistry).find(id =>
            book.title.includes(bookAnalysisRegistry[id].title) || bookAnalysisRegistry[id].title.includes(book.title)
        );
        if (intId) info = bookAnalysisRegistry[intId];
    }

    if (!info) {
        info = {
            summary: `　「${book.title}」は、${book.author}氏による著作で、ビジネスや個人の成長に役立つ洞察を提供します。内容を体系的に理解することで、あなたの目的に対する具体的なアプローチが可能になります。`,
            structureType: 'pyramid',
            structureData: { top: '知見の活用と実践', reasons: ['現状の整理', '課題の特定', '行動計画の策定'] },
            actions: ['主要なメッセージをノートに書き出す', '学んだことを一つだけ仕事に取り入れる', '自分なりの要約をアウトプットする'],
            keywords: ['スキルアップ', '実務応用']
        };
    }

    analysisView.innerHTML = `
        <button class="btn-back" onclick="hideAnalysis()">
            <i data-lucide="arrow-left"></i> 検索結果に戻る
        </button>
        <div class="analysis-header">
            <div class="analysis-book-cover">
                ${book.cover ? `<img src="${book.cover}" alt="${book.title}">` : `<div class="placeholder-cover"><span>${book.title[0]}</span></div>`}
            </div>
            <div class="analysis-book-info">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <div class="purpose-badge">目的: ${purpose}</div>
                <button class="btn-save-shelf" onclick="addToBookshelf()">
                    <i data-lucide="bookmark-plus"></i> 本棚に追加
                </button>
            </div>
        </div>
        <section class="analysis-body">
            <h4>エグゼクティブ・サマリー</h4>
            <div class="summary-text">${info.summary}</div>
            <h4>論理構造</h4>
            ${renderStructure(info.structureType, info.structureData)}
            <h4>実践アクション</h4>
            <ul>${info.actions.map(a => `<li>${a}</li>`).join('')}</ul>
        </section>
    `;
    lucide.createIcons();
}

function renderStructure(type, data) {
    if (type === 'flow') {
        return `<div class="flow-container">${data.map(i => `<div class="flow-step"><b>${i.label}</b><p>${i.text}</p></div>`).join('')}</div>`;
    } else {
        return `
            <div class="pyramid-view">
                <div class="pyramid-box-p top"><b>結論</b><p>${data.top}</p></div>
                <div class="pyramid-row">
                    ${(data.reasons || []).map(r => `<div class="pyramid-box-p"><b>根拠</b><p>${r}</p></div>`).join('')}
                </div>
            </div>
        `;
    }
}

// Minimal Community/Study Stubs
function renderCommunityFeed() {
    const feed = document.getElementById('community-feed');
    if (!feed) return;
    feed.innerHTML = state.posts.map(p => `
        <div class="card post-card">
            <b>${p.user}</b> <small>${p.timestamp}</small>
            <div class="post-book"># ${p.book}</div>
            <p>${p.content}</p>
        </div>
    `).join('');
}

function renderStudyPage() { renderBookshelf(); updateBookSelect(); renderMyPosts(); }

function addToBookshelf() {
    if (!state.selectedBook) return;
    if (state.myBooks.find(b => b.id === state.selectedBook.id)) { alert('既に追加済みです'); return; }
    state.myBooks.push({ ...state.selectedBook, timestamp: Date.now() });
    alert('本棚に追加しました！');
}

function renderBookshelf() {
    const shelf = document.getElementById('study-bookshelf');
    if (!shelf) return;
    document.getElementById('study-book-count').textContent = `${state.myBooks.length} 冊`;
    if (state.myBooks.length === 0) {
        shelf.innerHTML = '<p>本棚は空です。</p>';
    } else {
        shelf.innerHTML = state.myBooks.map(b => `
            <div class="study-book-item">
                <div class="thumb">${b.cover ? `<img src="${b.cover}">` : b.title[0]}</div>
                <h5>${b.title}</h5>
            </div>
        `).join('');
    }
}

function updateBookSelect() {
    const select = document.getElementById('study-post-book-select');
    if (!select) return;
    select.innerHTML = '<option value="">書籍を選択</option>' + state.myBooks.map(b => `<option value="${b.title}">${b.title}</option>`).join('');
}

function publishInsight() {
    const content = document.getElementById('study-post-input').value;
    const book = document.getElementById('study-post-book-select').value;
    if (!content) return;
    const post = { user: "あなた", book: book || "思考の整理", content, timestamp: "たった今" };
    state.myPosts.unshift(post);
    state.posts.unshift(post);
    renderMyPosts();
    alert('投稿しました');
}

function renderMyPosts() {
    const list = document.getElementById('study-my-posts');
    if (!list) return;
    list.innerHTML = state.myPosts.map(p => `<div class="card post-card"><b>${p.book}</b><p>${p.content}</p></div>`).join('');
}
