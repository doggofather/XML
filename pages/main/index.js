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

    async getData() {
        try {
            const data = await ajax.get(urls.getStocks());
            console.log("Загруженные данные:", data);
            return data;
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
             return null;
        }
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        console.log(`[MainPage] Кликнута карточка с id: ${cardId}, переход на ProductPage`);

        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    async render() {
        this.parent.innerHTML = '';
        const data = await this.getData();
        if (!data) return;
    
        const html = this.getContainerHTML();
        this.parent.insertAdjacentHTML('afterbegin', html);
    
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }   
}
