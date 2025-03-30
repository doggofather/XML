export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        console.log(data.cardText)
        return `
            <div class="product-card">
                <div class="product-details">
                    <h2>${data.cardTitle}</h2>
                    <p>${data.cardText}</p>
                    <img src="${data.src}" class="product-image" alt="Image">
                </div>
            </div>
        `;
    }
        
    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}