import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

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
    

    getData() {
        return [
            { 
                id: 1, 
                src:"https://standfortrees.org/wp-content/uploads/2020/03/SFT-Logo-Long-Color.png",
                title: "Спасём деревья!",
                text: "Узнай о проблемах" 
            },
            { 
                id: 2, 
                src: "https://standfortrees.org/wp-content/uploads/Untitled-800-x-1200-px-800-x-200-px-800-x-400-px-2.png", 
                title: "Наши проекты", 
                text: "Основные проекты" 
            },
            { 
                id: 3, 
                src: "https://standfortrees.org/wp-content/uploads/nordic-wirstbands-768x245.png", 
                title: "Наши партнеры", 
                text: "Узнай больше о наших партнерах" 
            }
        ];
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

        this.getData().forEach((item) => {
            const productCard = new ProductCardComponent(container);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}
