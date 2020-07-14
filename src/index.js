document.addEventListener('DOMContentLoaded', () => {
    const quoteList = document.getElementById('quote-list')
    const quoteForm = document.getElementById('new-quote-form')
    const quoteInput = document.getElementById('new-quote')
    const authorInput = document.getElementById('author')
    
    function pTag(quote) {
        const p = createEl('p')
        p.className = 'mb-0'
        p.innerText = quote.quote
        return p
    }
    
    function footTag(quote) {
        const f = createEl('footer')
        f.className = 'blockquote-footer'
        f.innerText = quote.author
        return f
    }
    
    function buttonTag(text, className) {
        const b = createEl('button')
        b.className = className
        b.innerText = text
        return b
    }
    
    function likeSpan(quote) {
        const s = createEl('span')
        // debugger
        s.innerText = " " + quote.likes.length
        return s
    }
    
    function listItem() {
        const li = createEl('li')
        li.className = 'quote-card'
        return li
    }
    
    function blockquote() {
        const b = createEl('blockquote')
        b.className = 'blockquote'
        return b
    }
    
    function addQuote(quote) {
        const li = listItem()
        const br = createEl('br')
        const bq = blockquote()
        const p = pTag(quote)
        const f = footTag(quote)
        const bL = buttonTag("Likes", 'btn-success')
        const bD = buttonTag("Delete", 'btn-danger')
        bD.id = quote.id
        enableDeleteQuote(bD)
        const likes = likeSpan(quote)
        bL.append(likes)
        bq.append(p, f, br, bL, bD)
        li.append(bq)
        quoteList.append(li)
    }
    
    function addQuotes(quotes) {
        quotes.forEach(quote => addQuote(quote))
    }
    
    function newQuote() {
        return {
            quote: quoteInput.value,
            author: authorInput.value
        }
    }
    
    function loadQuotes() {
        quoteList.innerHTML = ""
        fetch(`http://localhost:3000/quotes?_embed=likes`)
        .then(res => res.json())
        // .then(console.log)
        .then(quotes => addQuotes(quotes))
    }
    
    async function submitQuote() {
        const func = await fetch(`http://localhost:3000/quotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newQuote())
        })
        .catch(err => alert(err.message))
        loadQuotes()
    }
    
    function enableSubmitQuote() {
        quoteForm.addEventListener('submit', () => {
            event.preventDefault()
            submitQuote()
        })
    }
    
    async function deleteQuote(id) {
        const func = await fetch(`http://localhost:3000/quotes/${id}`, { 
            method: 'DELETE'
        })
        loadQuotes()
    }
    
    function enableDeleteQuote(button) {
        button.addEventListener('click', () => {deleteQuote(button.id)})
    }
    
    loadQuotes()
    enableSubmitQuote()
})

function createEl(element) {
    return document.createElement(element)
}