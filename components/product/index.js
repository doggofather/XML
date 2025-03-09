export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return `
            <div class="product-card">
                <div class="product-details">
                    <h2>${data.title}</h2>
                    <p>${data.text}</p>
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