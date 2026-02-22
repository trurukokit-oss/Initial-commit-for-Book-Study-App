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
        { id: 1, user: "田中 太一", book: "イシューからはじめよ", content: "この本のピラミッド構造を意識すると、会議での発言が劇的に変わりました。", likes: 24, timestamp: "2時間前" },
        { id: 2, user: "佐藤 優香", book: "考える技術・書く技術", content: "導入部の『SCQ法』が非常に参考になります。", likes: 12, timestamp: "5時間前" }
    ]
};

// Advanced AI Analysis Registry
const bookAnalysisRegistry = {
    '1': {
        title: 'イシューからはじめよ',
        author: '安宅 和人',
        summary: `「努力」ではなく「イシュー（解くべき問い）」から始めることで、圧倒的な生産性を実現する。`,
        structureType: 'flow',
        structureData: [
            { label: '1. イシュー特定', text: '「悩む」のではなく「考える」問いを一つに絞る' },
            { label: '2. 仮説立て', text: '証拠を探す前に、想定される結論を自分なりに描く' },
            { label: '3. アウトプット', text: '空中戦を避け、具体的な事実でピラミッドを埋める' }
        ],
        actions: ['PCを開く前に問いを付箋に書く', '会議のゴールを最初に定義する'],
        keywords: ['生産性', '思考法']
    },
    '2': {
        title: '考える技術・書く技術',
        author: 'バーバラ・ミント',
        summary: `情報の「並べ方」をピラミッド構造にすることで、相手の理解スピードを最大化する技術。`,
        structureType: 'pyramid',
        structureData: {
            top: '結論から話し、根拠を3つ添える',
            reasons: ['ピラミッドの並びは相手の疑問に答える順', '結論の下にはそれを支える事実を置く', '同じ性質の情報をグループ化する']
        },
        actions: ['メールの1行目を結論にする', '「ポイントは3つ」と宣言する'],
        keywords: ['ロジカルシンキング', '文章術']
    },
    '3': {
        title: '問いを立てる技術',
        author: '佐藤 直樹',
        summary: `正解を出す力よりも、新しい可能性を切り開く「問い」を作る力がこれからの価値になる。`,
        structureType: 'matrix',
        structureData: [
            { title: 'いままでの問い', content: '「どうすれば効率よく作れるか？」' },
            { title: 'これからの問い', content: '「もしこれを作らなくても幸せになれるとしたら？」' }
        ],
        actions: ['当たり前を疑う', '極端な前提で考えてみる'],
        keywords: ['イノベーション', 'アイデア']
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

    const navItems = ['search', 'community', 'study'];
    navItems.forEach(item => {
        const el = document.getElementById(`nav-${item}`);
        if (el) el.addEventListener('click', () => switchPage(item));
    });

    const btnPublish = document.getElementById('btn-post-publish');
    if (btnPublish) btnPublish.addEventListener('click', publishInsight);
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

// Robust Search Implementation
async function performSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    resultsGrid.innerHTML = '<div class="loader-container"><div class="loader"></div><p>知を探索中...</p></div>';
    resultsGrid.classList.remove('hidden');
    analysisView.classList.add('hidden');

    try {
        // 1. Internal Search (Highest priority)
        const internalResults = Object.keys(bookAnalysisRegistry)
            .filter(id => {
                const b = bookAnalysisRegistry[id];
                return b.title.includes(query) || b.keywords.some(k => k.includes(query));
            })
            .map(id => ({ ...bookAnalysisRegistry[id], id, isInternal: true, cover: null }));

        // 2. Multi-API Search (Parallel for speed)
        const apiResults = await fetchFromAPIs(query);

        // 3. Merge & Deduplicate
        const merged = [...internalResults];
        apiResults.forEach(apiBook => {
            if (!merged.some(m => m.title === apiBook.title)) merged.push(apiBook);
        });

        if (merged.length > 0) {
            renderSearchResults(merged);
        } else {
            renderErrorUI(query, "検索結果が見つかりませんでした");
        }
    } catch (e) {
        console.error("Search Fatal:", e);
        renderErrorUI(query, "通信エラーが発生しました");
    }
}

async function fetchFromAPIs(query) {
    const results = [];

    // Attempt Google Books
    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`);
        const data = await res.json();
        if (data.items) {
            data.items.forEach(item => {
                results.push({
                    id: item.id,
                    title: item.volumeInfo.title,
                    author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : '不明',
                    cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
                    isInternal: false
                });
            });
        }
    } catch (e) { console.warn("Google API failed"); }

    // Backup: Open Library (Only if Google is empty or fails)
    if (results.length === 0) {
        try {
            const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`);
            const data = await res.json();
            if (data.docs) {
                data.docs.forEach(doc => {
                    results.push({
                        id: doc.key,
                        title: doc.title,
                        author: doc.author_name ? doc.author_name[0] : '不明',
                        cover: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
                        isInternal: false
                    });
                });
            }
        } catch (e) { console.warn("OpenLibrary API failed"); }
    }

    return results;
}

function renderSearchResults(books) {
    resultsGrid.innerHTML = '';
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <div class="book-thumbnail-container">
                ${book.cover ? `<img src="${book.cover}" alt="${book.title}" class="book-thumbnail">` : `<div class="placeholder-cover"><span>${book.title[0]}</span></div>`}
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

    // Permanent Dynamic Links
    const mini = document.createElement('div');
    mini.className = 'external-links-panel';
    mini.innerHTML = `
        <p>もっと探す：</p>
        <div class="btn-group-mini">
            <a href="https://www.amazon.co.jp/s?k=${encodeURIComponent(searchInput.value)}&i=digital-text" target="_blank">Kindle</a>
            <a href="https://www.google.com/search?q=${encodeURIComponent(searchInput.value)}+本" target="_blank">Google</a>
            <a href="https://books.rakuten.co.jp/search?sitem=${encodeURIComponent(searchInput.value)}" target="_blank">楽天</a>
        </div>
    `;
    resultsGrid.appendChild(mini);
    lucide.createIcons();
}

function renderErrorUI(query, msg) {
    resultsGrid.innerHTML = `
        <div class="error-ui">
            <h3><i data-lucide="alert-circle"></i> ${msg}</h3>
            <p>外部サイトで直接探すことも可能です：</p>
            <div class="error-buttons">
                <a href="https://www.amazon.co.jp/s?k=${encodeURIComponent(query)}&i=digital-text" target="_blank" class="btn-fallback kindle">Kindle</a>
                <a href="https://www.google.com/search?q=${encodeURIComponent(query)}+内容+要約" target="_blank" class="btn-fallback google">Google</a>
            </div>
            <div class="tips">
                <small>ヒント: 「イシュー」「考える技術」などの正確なタイトルでもう一度お試しください。</small>
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
    window.scrollTo(0, 0);
}

function hideAnalysis() {
    document.querySelector('.search-hero').classList.remove('hidden');
    document.querySelector('.search-container').classList.remove('hidden');
    resultsGrid.classList.remove('hidden');
    analysisView.classList.add('hidden');
}

function renderAnalysis(book) {
    let info = bookAnalysisRegistry[book.id];
    if (!info) {
        const intId = Object.keys(bookAnalysisRegistry).find(id => book.title.includes(bookAnalysisRegistry[id].title));
        info = intId ? bookAnalysisRegistry[intId] : {
            summary: `${book.title}の概要（デモ版）...`,
            structureType: 'pyramid',
            structureData: { top: '主旨', reasons: ['根拠1', '根拠2'] },
            actions: ['アクション1', 'アクション2'],
            keywords: ['読書', '学習']
        };
    }

    analysisView.innerHTML = `
        <button class="btn-back" onclick="hideAnalysis()"><i data-lucide="arrow-left"></i> 戻る</button>
        <div class="analysis-header">
            <div class="author-label">${book.author}</div>
            <h3>${book.title}</h3>
            <button class="btn-save-shelf" onclick="addToBookshelf()"><i data-lucide="bookmark-plus"></i></button>
        </div>
        <div class="analysis-content">
            <section class="mb-4">
                <h5 class="label">サマリー</h5>
                <p>${info.summary}</p>
            </section>
            <section class="mb-4">
                <h5 class="label">論理構造</h5>
                ${renderStructure(info.structureType, info.structureData)}
            </section>
        </div>
    `;
    lucide.createIcons();
}

function renderStructure(type, data) {
    if (type === 'pyramid') {
        return `<div class="pyramid"><div class="p-top">${data.top}</div><div class="p-base">${data.reasons.map(r => `<div>${r}</div>`).join('')}</div></div>`;
    }
    return `<div class="flow">${(data || []).map(d => `<span>${d.label || d.title}</span>`).join(' → ')}</div>`;
}

// Stubs for other features
function renderCommunityFeed() { }
function renderStudyPage() { }
function addToBookshelf() { alert('追加しました'); }
function publishInsight() { alert('投稿しました'); }
