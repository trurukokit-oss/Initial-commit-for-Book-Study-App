// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initializeSelectors();
    setupEventListeners();
    renderNotebook();
});

// State Management
const state = {
    currentPage: 'search',
    notebook: [], // Books added to the notebook
    selectedSourceId: null,
    searchResults: [],
    posts: [
        { id: 101, user: "田中 太一", book: "イシューからはじめよ", content: "『犬の道』を避ける、という表現が秀逸。努力の量を誇るのではなく、価値のある問いに時間を割く勇気をもらいました。", likes: 42, timestamp: "2時間前" }
    ]
};

// Depth Analysis Registry (Enhanced for Note Evolution Theory)
const depthAnalysisRegistry = {
    '1': {
        title: 'イシューからはじめよ',
        author: '安宅 和人',
        // Lv.1: 構造要約 (問い・答え・根拠・実行)
        lv1: {
            question: '圧倒的に生産性の高い人は、何をしているのか？',
            answer: '「解くべき価値のある問い」を見極め、そこに全ての力を集中させている。',
            why: '100個の問題のうち、本当に解決すべき本質的な問題は1～2%しかないから。',
            how: '「犬の道（無闇な努力）」を避け、分析の前に仮説を立て、アウトプットから逆算する。'
        },
        // Lv.2: 文脈理解と本質の転用
        lv2: {
            principle: '「犬の道」の本質はプロセスの欠如ではなく、「判断の放棄」である。',
            adaptation: '筆者のような専門家でなくても、日常のメール一本、会議一つに対して「今日、何に白黒つけるのか」を自分に問うだけで、この原則は機能する。',
            caution: '著者の手法（高度なデータ分析）をそのまま真似るのではなく、その裏にある「問いを立てる姿勢」を自分の業務に移植すること。'
        },
        // Lv.3: 読み手の問いベースの構造化
        lv3: {
            insight: '「悩む」を「考える」に置き換える。',
            execution: '議事録を書く際、単なる発言録ではなく「決定事項と次に解くべきイシュー」だけに構造化して纏める習慣（議事メモの進化論）を取り入れる。'
        }
    }
};

// Global Selectors
let notebookSources, notebookMain, analysisSection, notebookWelcome, searchOverlay, searchResults;

function initializeSelectors() {
    notebookSources = document.getElementById('notebook-sources');
    notebookMain = document.querySelector('.notebook-main');
    analysisSection = document.getElementById('analysis-section');
    notebookWelcome = document.getElementById('notebook-welcome');
    searchOverlay = document.getElementById('search-overlay');
    searchResults = document.getElementById('search-results');
}

function setupEventListeners() {
    const btnAdd = document.getElementById('btn-add-source');
    const btnClose = document.getElementById('btn-close-search');
    const btnSearch = document.getElementById('btn-search');
    const searchInput = document.getElementById('book-search-input');

    if (btnAdd) btnAdd.addEventListener('click', () => searchOverlay.classList.remove('hidden'));
    if (btnClose) btnClose.addEventListener('click', () => searchOverlay.classList.add('hidden'));

    if (btnSearch) btnSearch.addEventListener('click', () => performSearch(searchInput.value));
    if (searchInput) searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch(searchInput.value);
    });

    ['search', 'community', 'study'].forEach(id => {
        const el = document.getElementById(`nav-${id}`);
        if (el) el.addEventListener('click', () => switchPage(id));
    });
}

function switchPage(pageId) {
    ['search', 'community', 'study'].forEach(id => {
        const page = document.getElementById(`page-${id}`);
        const btn = document.getElementById(`nav-${id}`);
        if (page) page.classList.toggle('active', id === pageId);
        if (btn) btn.classList.toggle('active', id === pageId);
    });
}

async function performSearch(query) {
    if (!query.trim()) return;
    searchResults.innerHTML = '<div class="loader"></div>';

    try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`);
        const data = await res.json();
        renderSearchOverlayResults(data.items || []);
    } catch (e) {
        searchResults.innerHTML = '<p>検索に失敗しました</p>';
    }
}

function renderSearchOverlayResults(books) {
    searchResults.innerHTML = books.map(item => {
        const b = item.volumeInfo;
        return `
            <div class="result-item-compact" onclick="addToNotebook('${item.id}', '${b.title.replace(/'/g, "\\'")}', '${(b.authors ? b.authors[0] : '不明').replace(/'/g, "\\'")}', '${b.imageLinks ? b.imageLinks.thumbnail : ''}')">
                <img src="${b.imageLinks ? b.imageLinks.thumbnail : ''}" class="mini-cover">
                <div>
                    <div style="font-weight:700">${b.title}</div>
                    <div style="font-size:0.7rem; color:var(--text-muted)">${b.authors ? b.authors[0] : '不明'}</div>
                </div>
            </div>
        `;
    }).join('');
}

function addToNotebook(id, title, author, cover) {
    if (state.notebook.some(b => b.id === id)) {
        selectSource(id);
        searchOverlay.classList.add('hidden');
        return;
    }

    const newBook = { id, title, author, cover };
    state.notebook.push(newBook);
    renderNotebook();
    selectSource(id);
    searchOverlay.classList.add('hidden');
}

function renderNotebook() {
    if (state.notebook.length === 0) {
        notebookSources.innerHTML = '<div class="empty-sources"><p>ソースがありません</p></div>';
        return;
    }

    notebookSources.innerHTML = state.notebook.map(b => `
        <div class="source-item ${state.selectedSourceId === b.id ? 'active' : ''}" onclick="selectSource('${b.id}')">
            <div class="source-icon">
                ${b.cover ? `<img src="${b.cover}" style="width:100%; height:100%; object-fit:cover;">` : b.title[0]}
            </div>
            <div class="source-info">
                <h5>${b.title}</h5>
                <p>${b.author}</p>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function selectSource(id) {
    state.selectedSourceId = id;
    renderNotebook();
    notebookWelcome.classList.add('hidden');
    analysisSection.classList.remove('hidden');
    renderDepthAnalysis(id);
}

function renderDepthAnalysis(id) {
    const book = state.notebook.find(b => b.id === id);
    let analysis = depthAnalysisRegistry[id] || generateEvolutionAnalysis(book);

    analysisSection.innerHTML = `
        <div class="analysis-hero-notebook">
            <h1 style="font-size: 2rem; margin-bottom: 0.5rem;">${book.title}</h1>
            <p style="color:var(--text-muted); margin-bottom: 2rem;">Source: ${book.author}</p>
        </div>

        <div class="evolution-container">
            <!-- Level 1: Structural Summary -->
            <section class="pillar-block">
                <div class="lvl-badge">Level 1</div>
                <h3 class="lvl-title">構造要約 / Structural Summary</h3>
                <div class="qa-grid">
                    <div class="qa-item"><span class="qa-label">Question</span><p>${analysis.lv1.question}</p></div>
                    <div class="qa-item"><span class="qa-label">Answer</span><p>${analysis.lv1.answer}</p></div>
                    <div class="qa-item"><span class="qa-label">Why</span><p>${analysis.lv1.why}</p></div>
                    <div class="qa-item"><span class="qa-label">How</span><p>${analysis.lv1.how}</p></div>
                </div>
            </section>

            <!-- Level 2: Contextual Adaptation -->
            <section class="pillar-block">
                <div class="lvl-badge">Level 2</div>
                <h3 class="lvl-title">文脈の転用 / Contextual Adaptation</h3>
                <div class="context-box">
                    <div class="ctx-item">
                        <i data-lucide="info"></i>
                        <div><strong>抽出された本質的原則:</strong><p>${analysis.lv2.principle}</p></div>
                    </div>
                    <div class="ctx-item">
                        <i data-lucide="refresh-cw"></i>
                        <div><strong>自分に合わせた転用方法:</strong><p>${analysis.lv2.adaptation}</p></div>
                    </div>
                    <div class="ctx-item">
                        <i data-lucide="alert-circle"></i>
                        <div><strong>注意点（鵜呑みにしない）:</strong><p>${analysis.lv2.caution}</p></div>
                    </div>
                </div>
            </section>

            <!-- Level 3: Principle Integration -->
            <section class="pillar-block" style="grid-column: span 2;">
                <div class="lvl-badge highlight">Level 3</div>
                <h3 class="lvl-title">原理原則の踏襲 / Principle Integration</h3>
                <div class="insight-card">
                    <div class="insight-main">「${analysis.lv3.insight}」</div>
                    <div class="execution-guide">
                        <strong>実践ガイド:</strong>
                        <p>${analysis.lv3.execution}</p>
                    </div>
                </div>
            </section>
        </div>
    `;
    lucide.createIcons();
    window.scrollTo(0, 0);
}

function generateEvolutionAnalysis(book) {
    return {
        lv1: {
            question: `「${book.title}」が解決しようとしている中心的な問題は何か？`,
            answer: `筆者が提示する、この時代に最も必要な答えは何か？`,
            why: `なぜその答えが現代において、あるいは読み手の状況において有効なのか？`,
            how: `具体的にどのようなステップを踏めば、その答えに辿り着けるか？`
        },
        lv2: {
            principle: '表層的なテクニックを剥がした後に残る「本質的な考え方」',
            adaptation: '自分の今の立場、ツール、環境に当てはめたとき、どう変換されるか',
            caution: '筆者の「文脈（企業の規模、時代背景）」と自分の違いを明確にする'
        },
        lv3: {
            insight: '思考のOSを書き換える、核心的な一行',
            execution: 'これまでの自分のやり方を、筆者の原理原則に基づいてどう「進化」させるか'
        }
    };
}
