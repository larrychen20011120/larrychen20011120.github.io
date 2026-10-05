# LarryCV 內容更新指南

這是一個不使用前端框架的靜態個人網站。大部分公開內容都直接寫在 `index.html`，日常更新通常不需要修改 `styles.css`。

本文件以內容維護為主，例如更新研究領域、新增 publication、project、award、經歷或聯絡方式。

## 檔案用途

| 檔案 | 用途 | 一般內容更新是否需要修改 |
| --- | --- | --- |
| `index.html` | 網站上看到的主要內容 | 是 |
| `script.js` | 首頁動態研究關鍵字、選單、主題切換 | 只有更新動態關鍵字時 |
| `latex/resume.tex` | PDF 履歷的原始檔 | 履歷內容也要同步時 |
| `static/resume.pdf` | 網站 Résumé 按鈕下載的 PDF | 由建置腳本產生 |
| `build-resume.sh` | 將 LaTeX 履歷輸出至 `static/resume.pdf` | 通常不用修改 |
| `styles.css` | 網站外觀與響應式排版 | 純內容更新不要修改 |
| `static/` | PDF、favicon 等靜態檔案 | 替換附件時 |

行號會隨內容增減而改變，因此請使用下表的 ID、class 或文字搜尋，不要依賴固定行號。

## 快速索引

| 想更新的內容 | 編輯位置或搜尋文字 |
| --- | --- |
| 姓名與職務名稱 | `.profile-heading`、`.profile-role` |
| 翻面頭貼 | `static/profile.jpg`、`.profile-photo` |
| Email、GitHub、LinkedIn、履歷連結 | `.profile-links` |
| 自我介紹與研究方向 | `<section ... id="about">` |
| 個人興趣與近期目標 | `.about-more` |
| 首頁動態研究關鍵字 | `script.js` 中的 `typingPhrases` |
| 研究領域 tags | `.interest-row` |
| 工作經歷 | `<section ... id="experience">` |
| 學歷與學校成果 tags | `<section ... id="education">` |
| Projects | `<section ... id="projects">` |
| Publications | `<section ... id="publications">` |
| Awards | `<section ... id="honors">` |
| Technical Skills | `.skills-list` |
| 瀏覽器分頁標題與搜尋摘要 | `<title>`、`meta[name="description"]` |
| PDF 履歷內容 | `latex/resume.tex` |

## 更新研究領域

研究方向會出現在四個位置，建議一起檢查，避免首頁顯示互相矛盾的內容。

### 1. About 內文

在 `index.html` 搜尋 `id="about"`，更新這段主要介紹：

```html
<p>
  My research sits at the intersection of <strong>AREA ONE</strong>,
  <strong>AREA TWO</strong>, and <strong>AREA THREE</strong>.
  ADD ONE SENTENCE THAT EXPLAINS WHAT YOU BUILD OR STUDY.
</p>
```

研究領域名稱可使用 `<strong>` 強調，但不要把整段文字都加粗。

### 2. Research tags

在同一個 About section 搜尋 `.interest-row`：

```html
<div class="interest-row">
  <span>Agentic AI</span>
  <span>Data Mining</span>
  <span>New Research Area</span>
</div>
```

新增或刪除一個 `<span>` 即可。tag 名稱建議保持簡短，約 1 至 4 個單字。

### 3. 動態關鍵字

在 `script.js` 搜尋 `typingPhrases`：

```js
const typingPhrases = [
  'agentic AI',
  'data mining',
  'new research topic',
  'data science competitions'
];
```

同時更新 `index.html` 中緊接在 `.typing-kicker` 後面的無障礙說明：

```html
<p class="sr-only">Current research focuses include ...</p>
```

### 4. SEO 與 PDF 履歷

如果整體研究定位已改變，也要檢查：

- `index.html` 頂部的 `meta[name="description"]`
- `index.html` 的 `<title>`
- `latex/resume.tex` Education 內的 `Research:`
- `latex/resume.tex` 的 `Technical Skills`

## 更新個人興趣與近期目標

在 About section 搜尋 `.about-more`。左欄 `.about-more-block` 是研究以外的
興趣，右欄是目前目標：

```html
<div class="about-more">
  <div class="about-more-block">
    <h3>Beyond research</h3>
    <p>Movies, coding, table tennis, swimming, and mathematics.</p>
  </div>
  <div class="about-more-block">
    <h3>Current goals</h3>
    <ul>
      <li>Complete my master's degree.</li>
      <li>Build a substantial project.</li>
      <li>Publish research at a top-tier conference.</li>
    </ul>
  </div>
</div>
```

興趣請維持一句簡短文字；目標可新增或刪除 `<li>`，建議保留 2 至 4 項。

## 新增 Publication

在 `index.html` 搜尋 `class="publication-list"`，依時間由新到舊放入一個新的 `<article>`。

### Publication 範本

```html
<article class="publication-item reveal" id="publication-unique-slug">
  <div class="publication-meta">
    <span class="venue-pill">CONF '26</span>
    <span>Conference or Workshop Name</span>
  </div>
  <h3>Full Paper Title</h3>
  <p class="publication-authors">
    First Author, <u>Kuan-Ting Chen</u>, and Last Author
  </p>
  <div class="publication-links">
    <a href="PAPER_URL" target="_blank" rel="noreferrer">Paper <span aria-hidden="true">↗</span></a>
    <a href="GITHUB_URL" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
  </div>
</article>
```

Publication 更新規則：

- `venue-pill` 放簡短 venue，例如 `ACL '26`、`AAAI '25` 或 `ARR`。
- 第二個 meta 放完整狀態，例如 `Main Conference`、`Workshop` 或 `Under review`。
- 使用 `<u>Kuan-Ting Chen</u>` 標示自己的名字。
- 目前版面不放 paper 摘要或簡短描述。
- 沒有 Paper 或 GitHub 時，刪除對應的 `<a>`。
- 完全沒有公開資源時，刪除整個 `<div class="publication-links">`。
- `id` 必須全站唯一，並使用小寫英文字、數字與連字號。
- 如果 Project 的連結使用 `href="#publication-unique-slug"`，兩邊文字必須完全一致。

新增論文後也要檢查：

- Education 中的 `2 Publications` 是否需要更新數量。
- `latex/resume.tex` 的 `Publications` section。
- 相關 Project 是否要新增 Publication 連結。

## 更新 Publication 狀態

論文從 under review 變成 accepted 時，通常只需要修改 publication meta：

```html
<div class="publication-meta">
  <span class="venue-pill">ACL '26</span>
  <span>Main Conference</span>
</div>
```

有正式 paper 或 repository 後，再加入 `publication-links`。不要先放無法開啟的 placeholder URL。

## 新增 Award

在 `index.html` 搜尋 `class="award-list"`，依時間由新到舊加入新的 `<article>`。

### Award 範本

```html
<article class="award-row reveal">
  <span class="award-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24">
      <path
        d="M8 3h8v5a4 4 0 0 1-8 0V3Z M8 5H5v2a4 4 0 0 0 4 4
           M16 5h3v2a4 4 0 0 1-4 4M12 12v4M9 16h6v4H9M7 20h10"
      ></path>
    </svg>
  </span>
  <div class="award-content">
    <div class="award-headline">
      <div class="award-title">
        <span class="award-rank">Award Tag</span>
        <h3>Full Award Name</h3>
      </div>
      <time class="award-date" datetime="2026-05">May 2026</time>
    </div>
    <div class="award-details">
      <p>Awarding organization, ranking, or one short supporting fact.</p>
      <div class="award-links">
        <a href="RESOURCE_URL" target="_blank" rel="noreferrer">Report <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </div>
</article>
```

Award 更新規則：

- `award-rank` 可放 `1st Place`、`Best Paper`、`Top 5%` 或 `Scholarship`。
- 沒有適合的 tag 時，可以刪除 `award-rank`，保留 `<h3>`。
- `datetime` 使用 `YYYY-MM`；畫面文字使用 `Mon. YYYY`。
- `award-details` 可放主辦單位、排名、獲獎比例或一項簡短成果。
- 支援 `Paper`、`Code`、`Report`、`Project`、`Certificate` 等連結。
- 沒有附件或連結時，刪除整個 `<div class="award-links">`。
- 站內連結使用 `href="#target-id"`；外部連結保留 `target="_blank" rel="noreferrer"`。

如果獎項與某個 Project 有關，可以先替 Project article 加上唯一 ID：

```html
<article class="project-card reveal" id="project-example">
```

再從 Award 連回該 Project：

```html
<a href="#project-example">Project <span aria-hidden="true">↑</span></a>
```

## 新增或更新 Project

在 `index.html` 搜尋 `class="project-grid"`。最安全的方式是複製一個內容最接近的完整 `.project-card`，再更新以下內容：

| 位置 | 要更新的內容 |
| --- | --- |
| `.project-meta` 第一個 `<span>` | 順序與領域，例如 `04 · Multimodal AI` |
| `.project-meta` 第二個 `<span>` | 類型或成果，例如 `Research`、`Open source` |
| `.project-body h3` | Project 名稱 |
| `.project-body > p` | 一句簡短說明 |
| `.project-links` | Publication、Code、Project site 或 Award |
| `<figure>` 內的 `<title>` | 圖示的無障礙說明 |
| SVG 內文字 | 圖中的流程與元件名稱 |

注意事項：

- 外部連結使用 `target="_blank" rel="noreferrer"`。
- 尚未公開的資料可以使用現有 `.link-pending` 樣式，不要填入假網址。
- 如果 SVG 使用 `<marker id="...">`，新 Project 必須改成新的唯一 ID，並同步修改 `marker-end="url(#...)"`。
- Award 或 Publication 需要連到 Project 時，替 `.project-card` 加入唯一 `id`。
- 新 Project 的插圖若需要完全不同的結構，才需要另外調整 `styles.css`。

## 新增 Experience

在 `id="experience"` 的 `.timeline` 內複製完整 `.timeline-item`。

需要更新：

- `.entry-label`：通常維持 `Experience`。
- `<h3>`：職稱。
- `<time>`：顯示期間。
- 地點 icon 後的文字。
- `.entry-place`：公司、實驗室或專案名稱與連結。
- `<ul>`：2 至 4 個具體工作成果。

目前 Experience 只有一筆，因此容器使用：

```html
<div class="timeline timeline-single">
```

新增第二筆 Experience 後，請移除 `timeline-single`，讓時間軸連線顯示：

```html
<div class="timeline">
```

## 新增 Education

在 `id="education"` 的 `.timeline` 內複製完整 `.timeline-item`。

需要更新：

- `<h3>`：學校名稱。
- `<time>`：就讀期間。
- 地點。
- `.entry-place`：學位與系所。
- Advisor、GPA 或研究領域說明。
- `.entry-tags`：書卷獎、honor society、publication 數量或具體成果。

Education tag 範例：

```html
<div class="entry-tags">
  <span>Academic Excellence Award</span>
  <span>Phi Tau Phi</span>
  <span>3 Publications</span>
</div>
```

不要把完整句子放進 tag；詳細內容應放在前面的 `<p>`。

## 更新個人資料與聯絡方式

在 `index.html` 搜尋 `.profile-heading`：

```html
<div class="profile-heading">
  <h2 id="profile-name">Kuan-Ting Chen</h2>
  <p class="profile-role">AI Researcher · Research Engineer</p>
</div>
```

職務名稱建議維持一行，使用 `·` 分隔主要定位與目標職務。

### 更新翻面頭貼

將正方形或接近正方形的照片放在：

```text
static/profile.jpg
```

重新整理頁面後，網站會自動啟用頭像翻面：

- 桌面版可將滑鼠移到皮卡丘上查看照片。
- 鍵盤可聚焦頭像後按 Enter 或 Space 切換。
- 手機可點擊頭像切換。
- 耳朵位於翻面圖層外，因此照片顯示時仍會保留。
- 圖片不存在或載入失敗時，翻面功能不會啟用，也不會顯示破圖。

建議使用至少 `600 × 600` 的 JPG，並將臉部放在圖片中央偏上。如果改用
PNG 或其他檔名，必須同步修改 `index.html` 中 `.profile-photo` 的 `src`。

聯絡方式在 `.profile-links`。更新連結時要同時修改 `href`，如果只改畫面文字，按下去仍會前往舊網址。

常見格式：

```html
<a href="mailto:NAME@example.com">...</a>
<a href="https://github.com/USERNAME" target="_blank" rel="noreferrer">...</a>
```

姓名也出現在導覽列、About、頁尾、`<title>`、meta description 與 PDF 履歷；更名時請搜尋整個專案確認。

## 更新 Technical Skills

在 `index.html` 搜尋 `.skills-list`：

```html
<dl class="skills-list reveal">
  <div><dt>Proficient</dt><dd>Python, PyTorch, Agentic AI</dd></div>
  <div><dt>Familiar</dt><dd>C++, Computer Vision, CI/CD</dd></div>
</dl>
```

`dt` 是分類名稱，`dd` 是技能內容。新增分類時複製完整 `<div>`。

技能有重大變動時，也要同步 `latex/resume.tex` 的 `Technical Skills`。

## 更新 PDF 履歷

網站與 PDF 履歷是兩份獨立內容，修改 `index.html` 不會自動更新 PDF。

更新流程：

1. 編輯 `latex/resume.tex`。
2. 在專案根目錄執行 `./build-resume.sh`。
3. 確認終端顯示 `Generated .../static/resume.pdf`。
4. 從網站的 Résumé 按鈕開啟 PDF，確認內容與連結。

建置需要系統已安裝 `latexmk` 與 LaTeX 套件。如果無法建置，也可以用新的 PDF 直接替換 `static/resume.pdf`，但檔名必須保持相同。

## HTML 內容注意事項

- 文字中的 `&` 要寫成 `&amp;`，例如 `Research &amp; Development`。
- 外部連結使用 `target="_blank" rel="noreferrer"`。
- `id` 不可重複，站內 `href="#..."` 必須能找到完全相同的 `id`。
- 刪除 optional 區塊時，要刪除完整的 opening tag 與 closing tag。
- 新項目通常要保留 `reveal` class，才會有進場效果。
- Publication、Award、Experience、Education 建議依時間由新到舊排列。
- 純內容更新不要修改 SVG path、CSS class 名稱或 JavaScript 的選擇器。

## Tags 尺寸

一般新增 tag 時，只要沿用既有 markup，不需要設定 inline style：

```html
<span>New Tag</span>
```

全站 pill tags 的共用尺寸集中在 `styles.css` 的 `:root`：

```css
--tag-font-size: 0.7rem;
--tag-min-height: 1.65rem;
--tag-padding-block: 0.22rem;
--tag-padding-inline: 0.62rem;
```

只有想調整全站所有 tags 時才修改這些變數。單一內容項目不要另外指定字級或 padding。

## 本機預覽與檢查

在專案根目錄啟動本機網站：

```bash
python3 -m http.server 8000
```

瀏覽器開啟 `http://localhost:8000`。

內容修改後至少執行：

```bash
npx --yes html-validate index.html
git diff --check
```

送出前檢查：

1. 桌面版與手機版都沒有文字重疊或超出 box。
2. Light mode 與 dark mode 都可閱讀。
3. Paper、GitHub、Project、Email 與 Résumé 連結可以開啟。
4. 新增的站內連結會捲動到正確項目。
5. 網站與 `static/resume.pdf` 的日期、數量與狀態一致。
