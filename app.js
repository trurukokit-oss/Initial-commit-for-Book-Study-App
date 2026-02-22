// Initialize Lucide icons
lucide.createIcons();

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
        imgConcept: '大きな暗闇の迷路の中で、たったひとつの「正しい出口」にスポットライトが当たっている様子。'
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
        imgConcept: '散らばっていたたくさんの石が、誰かの手によってひとつの美しい塔になっていく様子。'
    },
    '3': {
        title: '問いを立てる技術',
        author: '佐藤 直樹',
        summary: `　AIが何でも答えてくれる時代、一番価値があるのは「答え」ではなく「問い」です。なぜなら、誰もが正解にたどり着けるようになった今、差がつくのは「どこに目を向けるか」という視点の置き方だからです。この本は、当たり前だと思っている前提を疑い、新しい可能性を切り開くための「質問の作り方」を教えてくれます。

　例えば、売上が落ちている時に「どうすれば売れるか？」と問うのは、誰でも思いつく普通の問いです。でも、これでは既存の延長線上の答えしか出ません。そこで、「なぜお客様は、今、うちの商品を買うのをやめて、幸せになっているのか？」と一歩踏込だ変な問いを立ててみます。すると、「あれ、うちの商品って実はお客様の自由を奪っていたのかも？」といった、全く新しい発見が生まれるのです。

　問いを変えることは、カメラのレンズを付け替えることに似ています。ピントが合っていないところでいくらシャッターを切っても、ぼやけた写真しか撮れません。問いという名のレンズを正しく選ぶことで、今まで見えていなかったチャンスや問題の本質が、パッと鮮明に浮かび上がってきます。

　「何をしたらいいかわからない」と立ち止まった時、それはあなたが能力不足なのではなく、単に「良い問い」に出会っていないだけかもしれません。自分の人生や仕事のハンドルを握り直すために、自分にどんな質問を投げかけるべきか。そんなワクワクするような知的な冒険へと、この本は誘ってくれます。`,
        structureType: 'matrix',
        structureData: [
            { title: 'いままでの問い', content: '「どうすれば効率よく、もっとたくさん作れるか？」' },
            { title: 'これからの問い', content: '「もしこれを作らなくても、私たちは幸せになれるとしたら？」' },
            { title: '自分を動かす問い', content: '「本当は、喉から手が出るほど何を実現したいのか？」' },
            { title: '未来を創る問い', content: '「まだ誰も気づいていない、この世の『おかしなこと』は何か？」' }
        ],
        actions: [
            '【行き詰まったら】「もし予算が100倍あったら？」「もし明日が締め切りなら？」と極端な前提で考えてみる',
            '【アイデア出し】「できない理由」を探す脳を止め、「もし魔法が使えるならどうしたい？」と子供のような問いを自分に投げる',
            '【日常の習慣】毎日ひとつだけ、当たり前のルールに「それって本当？誰が決めたの？」と好奇心を持って疑ってみる'
        ],
        keywords: ['新しいアイデア', '思い込みを外す', '好奇心', '視点の転換'],
        imgConcept: '真っ白な部屋に不思議な形のドアが現れ、そこから光が差し込んでいる様子。'
    }
};

// DOM Elements
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

const btnSearch = document.getElementById('btn-search');
const searchInput = document.getElementById('book-search-input');
const resultsGrid = document.getElementById('search-results');
const analysisView = document.getElementById('analysis-section');

// Navigation Logic
function switchPage(pageId) {
    state.currentPage = pageId;
    Object.keys(pages).forEach(key => {
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

navBtns.search.addEventListener('click', () => switchPage('search'));
navBtns.community.addEventListener('click', () => switchPage('community'));
navBtns.study.addEventListener('click', () => switchPage('study'));

// Hybrid Search Implementation
async function performSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    resultsGrid.innerHTML = '<div class="loader">検索中...</div>';
    resultsGrid.classList.remove('hidden');
    analysisView.classList.add('hidden');

    try {
        // 1. Check Internal Registry for exact or partial title matches
        const internalResults = [];
        Object.keys(bookAnalysisRegistry).forEach(id => {
            const book = bookAnalysisRegistry[id];
            if (book.title.includes(query) || query.includes(book.title.substring(0, 4))) {
                internalResults.push({
                    id: id,
                    title: book.title,
                    author: book.author || '不明',
                    cover: null, // We'll use placeholder or default image
                    isInternal: true
                });
            }
        });

        // 2. Fetch from Google Books API
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=8`);
        const data = await response.json();

        let apiResults = [];
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

        // 3. Merge results (Prioritize internal)
        // Deduplicate: if an API result has the same title as an internal one, skip it
        const mergedResults = [...internalResults];
        apiResults.forEach(apiBook => {
            const isDuplicate = internalResults.some(intBook =>
                apiBook.title.includes(intBook.title) || intBook.title.includes(apiBook.title)
            );
            if (!isDuplicate) {
                mergedResults.push(apiBook);
            }
        });

        if (mergedResults.length > 0) {
            renderSearchResults(mergedResults);
        } else {
            resultsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">本が見つかりませんでした。別のキーワードをお試しください。</p>';
        }
    } catch (error) {
        console.error("Search Error:", error);
        resultsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #ef4444;">エラーが発生しました。インターネット接続を確認してください。</p>';
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
                    <div class="placeholder-cover">
                        <span>${book.title.substring(0, 1)}</span>
                    </div>
                `}
            </div>
            <div class="book-card-info">
                <h4>${book.title}</h4>
                <p>${book.author}</p>
                ${book.isInternal ? '<span style="font-size: 0.7rem; background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px; margin-top: 5px; display: inline-block;">プレミアム分析あり</span>' : ''}
            </div>
        `;
        card.addEventListener('click', () => showAnalysis(book));
        resultsGrid.appendChild(card);
    });
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

    // Find internal info by either ID or matching title
    let info = bookAnalysisRegistry[book.id];
    if (!info) {
        const internalId = Object.keys(bookAnalysisRegistry).find(id =>
            book.title.includes(bookAnalysisRegistry[id].title) || bookAnalysisRegistry[id].title.includes(book.title)
        );
        if (internalId) info = bookAnalysisRegistry[internalId];
    }

    if (!info) {
        info = {
            summary: `　「${book.title}」は、${book.author}氏による著作で、ビジネスや個人の成長に役立つ洞察を提供します。内容を体系的に理解することで、あなたの目的に対する具体的なアプローチが可能になります。`,
            structureType: 'pyramid',
            structureData: { top: '知見の活用と実践', reasons: ['現状の整理', '課題の特定', '行動計画の策定'] },
            actions: ['主要なメッセージをノートに書き出す', '学んだことを一つだけ明日の仕事に取り入れる', '自分なりの要約をSNSでアウトプットする'],
            keywords: ['キャリアアップ', '実務応用'],
            imgConcept: '洗練された書斎と、そこから広がる新しい可能性。'
        };
    }

    analysisView.innerHTML = `
        <button class="btn-back" id="btn-back">
            <i data-lucide="arrow-left"></i> 検索結果に戻る
        </button>
        
        <div class="analysis-header">
            <div class="analysis-book-cover">
                ${book.cover ? `<img src="${book.cover}" alt="${book.title}">` : `<div class="placeholder-cover"><span>${book.title[0]}</span></div>`}
            </div>
            <div class="analysis-book-info">
                <h3>${book.title}</h3>
                <p style="color: var(--text-muted); margin-bottom: 1rem;">${book.author}</p>
                <div style="background: #eff6ff; padding: 0.75rem; border-radius: 4px; font-size: 0.9rem; border: 1px solid #dbeafe;">
                    <strong style="color:var(--primary)">あなたの目的:</strong> ${purpose}
                </div>
                <button class="btn-save-shelf" id="btn-save-shelf">
                    <i data-lucide="bookmark-plus"></i> 本棚に追加する
                </button>
            </div>
        </div>
        
        <section class="summary-section">
            <h4 style="margin-bottom: 1rem; border-left: 4px solid var(--primary); padding-left: 1rem;">エグゼクティブ・サマリー</h4>
            <div style="font-size: 1rem; color: var(--text-main); line-height: 1.8;">
                ${info.summary.split('\n\n').map(p => `<p style="text-indent: 1em; margin-bottom: 1rem;">${p.trim().replace(/^　/, '')}</p>`).join('')}
            </div>
        </section>

        <section class="structure-container">
            <h4 style="text-align: center; margin-bottom: 2rem; font-weight: 700;">
                ${info.structureType === 'flow' ? '思考のプロセス' : info.structureType === 'matrix' ? '比較・分析マトリクス' : '論理構造（ピラミッド）'}
            </h4>
            ${renderStructure(info.structureType, info.structureData)}
        </section>

        <section class="action-section">
            <h4 style="color: #9d174d; font-weight: 700;"><i data-lucide="zap"></i> 実践アクション</h4>
            <ul style="padding-left: 1.5rem; font-size: 0.95rem; display: grid; gap: 0.75rem;">
                ${info.actions.map(a => `<li>${a}</li>`).join('')}
            </ul>
        </section>

        <section id="related-books-section" style="margin-top: 3rem;">
            <h4 style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; color: var(--primary);">
                <i data-lucide="library"></i> この本に関連するおすすめ
            </h4>
            <div id="related-books-grid" class="related-grid"><div class="loader">読み込み中...</div></div>
        </section>

        <section style="margin-top: 2rem;">
            <h4 style="margin-bottom: 1rem;">この本の関連キーワード</h4>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                ${info.keywords.map(k => `<span style="background:#f1f5f9; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; color: var(--text-muted);"># ${k}</span>`).join('')}
            </div>
        </section>
    `;

    document.getElementById('btn-back').addEventListener('click', hideAnalysis);
    document.getElementById('btn-save-shelf').addEventListener('click', () => addToBookshelf(book));
    lucide.createIcons();

    // Load related books
    const relatedBooks = await fetchRelatedBooks(book);
    const relatedGrid = document.getElementById('related-books-grid');
    if (relatedGrid) {
        if (relatedBooks.length > 0) {
            relatedGrid.innerHTML = '';
            relatedBooks.forEach(rb => {
                const item = document.createElement('div');
                item.className = 'related-book-card';
                item.innerHTML = `
                    <div class="related-cover">
                        ${rb.cover ? `<img src="${rb.cover}" alt="${rb.title}">` : `<div class="placeholder-cover"><span>${rb.title[0]}</span></div>`}
                    </div>
                    <div class="related-info">
                        <h5>${rb.title}</h5>
                        <p>${rb.author}</p>
                    </div>
                `;
                item.addEventListener('click', () => showAnalysis(rb));
                relatedGrid.appendChild(item);
            });
        } else {
            relatedGrid.innerHTML = '<p style="color: var(--secondary); font-size: 0.9rem;">関連書籍は見つかりませんでした。</p>';
        }
    }
}

function renderStructure(type, data) {
    if (type === 'flow') {
        return `
            <div class="flow-container">
                ${data.map(item => `
                    <div class="flow-step">
                        <small style="color: var(--primary); font-weight: 700;">${item.label}</small>
                        <p style="margin-top: 0.25rem;">${item.text}</p>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (type === 'matrix') {
        return `
            <div class="matrix-grid">
                ${data.map(item => `
                    <div class="matrix-item">
                        <h5>${item.title}</h5>
                        <p style="font-size: 0.85rem;">${item.content}</p>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        return `
            <div class="pyramid-level">
                <div class="pyramid-box top">
                    <h4>Main Message</h4>
                    <p>${data.top || '主旨'}</p>
                </div>
                <div class="pyramid-connector"></div>
                <div class="pyramid-branches">
                    ${(data.reasons || []).map((r, i) => `
                        <div class="pyramid-box">
                            <h4>Reason ${i + 1}</h4>
                            <p>${r}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

async function fetchRelatedBooks(book) {
    const query = (book.categories && book.categories.length > 0) ? book.categories[0] : book.title;
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=4`);
        const data = await response.json();
        return data.items ? data.items.map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : '不明',
            cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null,
            categories: item.volumeInfo.categories || []
        })).filter(b => b.id !== book.id) : [];
    } catch (e) {
        return [];
    }
}

// Events
btnSearch.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

// Community and Study
function renderCommunityFeed() {
    const feed = document.getElementById('community-feed');
    feed.innerHTML = '';
    state.posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.className = 'card post-card';
        postEl.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
                <span style="font-weight: 700; font-size: 0.9rem;">${post.user}</span>
                <span style="color: var(--text-muted); font-size: 0.8rem;">${post.timestamp}</span>
            </div>
            <div style="background: #f8fafc; padding: 0.5rem 0.75rem; border-radius: 4px; font-size: 0.85rem; color: var(--primary); font-weight: 600; margin-bottom: 0.75rem; border-left: 3px solid var(--primary);">
                # ${post.book}
            </div>
            <p style="font-size: 0.95rem; margin-bottom: 1rem;">${post.content}</p>
            <div style="display: flex; gap: 1.5rem; color: var(--text-muted); font-size: 0.85rem;">
                <span><i data-lucide="heart" style="width: 16px; height: 16px; display: inline; vertical-align: middle;"></i> ${post.likes}</span>
            </div>
        `;
        feed.appendChild(postEl);
    });
    lucide.createIcons();
}

function renderStudyPage() {
    renderBookshelf();
    renderMyPosts();
    updateBookSelect();
}

function addToBookshelf(book) {
    if (state.myBooks.find(b => b.id === book.id)) {
        alert('この本は既に本棚にあります。');
        return;
    }
    state.myBooks.push({ ...book, timestamp: Date.now() });
    alert('「マイ書斎」の本棚に追加しました！');
}

function removeFromBookshelf(bookId, event) {
    if (event) event.stopPropagation();
    if (confirm('この本を本棚から削除しますか？')) {
        state.myBooks = state.myBooks.filter(b => b.id !== bookId);
        renderBookshelf();
        updateBookSelect();
    }
}

function renderBookshelf() {
    const shelf = document.getElementById('study-bookshelf');
    const countDisplay = document.getElementById('study-book-count');
    countDisplay.textContent = `${state.myBooks.length} 冊の書籍`;

    if (state.myBooks.length === 0) {
        shelf.innerHTML = '<div class="empty-shelf"><i data-lucide="book-open"></i><p>本棚にまだ書籍がありません。</p></div>';
    } else {
        shelf.innerHTML = '';
        state.myBooks.forEach(book => {
            const item = document.createElement('div');
            item.className = 'study-book-item';
            item.innerHTML = `
                <button class="btn-delete-book" title="削除"><i data-lucide="x" style="width: 14px; height: 14px;"></i></button>
                <div class="book-thumbnail-container" style="aspect-ratio: 2/3;">
                    ${book.cover ? `<img src="${book.cover}" alt="${book.title}" class="book-thumbnail">` : `<div class="placeholder-cover"><span>${book.title[0]}</span></div>`}
                </div>
                <h4 style="margin-top: 0.5rem; font-size: 0.85rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${book.title}</h4>
            `;
            item.querySelector('.btn-delete-book').addEventListener('click', (e) => removeFromBookshelf(book.id, e));
            item.addEventListener('click', () => showAnalysis(book));
            shelf.appendChild(item);
        });
    }
    lucide.createIcons();
}

function updateBookSelect() {
    const select = document.getElementById('study-post-book-select');
    if (!select) return;
    select.innerHTML = '<option value="">書籍を選択（任意）</option>';
    state.myBooks.forEach(book => {
        const opt = document.createElement('option');
        opt.value = book.title;
        opt.textContent = book.title;
        select.appendChild(opt);
    });
}

function renderMyPosts() {
    const list = document.getElementById('study-my-posts');
    if (!list) return;
    list.innerHTML = '';
    if (state.myPosts.length === 0) {
        list.innerHTML = '<p style="color:var(--secondary); font-size:0.9rem; text-align:center; padding: 2rem;">まだ投稿がありません。</p>';
        return;
    }
    state.myPosts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.className = 'card post-card';
        postEl.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.8rem;">
                <span style="font-weight: bold; color: var(--primary);"># ${post.book}</span>
                <span style="color: var(--text-muted);">${post.timestamp}</span>
            </div>
            <p style="font-size: 0.9rem; margin-bottom: 0.75rem;">${post.content}</p>
        `;
        list.appendChild(postEl);
    });
    lucide.createIcons();
}

const btnPublish = document.getElementById('btn-post-publish');
if (btnPublish) {
    btnPublish.addEventListener('click', () => {
        const content = document.getElementById('study-post-input').value.trim();
        const book = document.getElementById('study-post-book-select').value;
        if (!content) return;
        const newPost = { id: Date.now(), user: "あなた", book: book || "思考の整理", content: content, likes: 0, timestamp: "たった今" };
        state.myPosts.unshift(newPost);
        state.posts.unshift(newPost);
        document.getElementById('study-post-input').value = '';
        renderMyPosts();
        alert('インサイトを投稿しました！');
    });
}

const btnVoice = document.getElementById('btn-voice');
if (btnVoice) {
    btnVoice.addEventListener('click', () => alert('音声入力機能を開始します...'));
}
