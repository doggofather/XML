import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getContainerHTML() {
        return `<div id="main-page"></div>`;
    }
    
    getLogosHTML() {
        return `
            <div id="logos-container">
                <img src="./logo/logo1.png" alt="Логотип" class="logo">
            </div>
        `;
    }
    
    
    getContainerHTML() {
        return `
            ${this.getLogosHTML()} 
            <div id="main-page"></div>
        `;
    }
    
    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }

    getData() {
        ajax.get(urls.getStocks(), (data) => {
            this.renderData(data);
        })
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        console.log(`[MainPage] Кликнута карточка с id: ${cardId}, переход на ProductPage`);

        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    render() {
        console.log("[MainPage] Рендер главной страницы");
        
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getContainerHTML());

        const container = this.pageRoot;

        this.getData();
    }
}
