// ============================================
//  TIENDA - CHARMANDER ADVENTURE
// ============================================

const STORE_DATA = [
    { id: 1, name: 'Café', price: 10, emoji: '☕', description: 'Charmander toma café y se vuelve más rápido', effect: 'speed' },
    { id: 2, name: 'Galleta', price: 20, emoji: '🍪', description: 'Charmander come galletas y crece un poco', effect: 'growth' },
    { id: 3, name: 'Pokébola', price: 50, emoji: '🔴', description: 'Un objeto misterioso...', effect: 'mystery' },
    { id: 4, name: 'Charmander Plush', price: 100, emoji: '🧸', description: 'Un peluche de Charmander para decorar', effect: 'cosmetic' }
];

class StoreManager {
    constructor() {
        this.modal = document.getElementById('storeModal');
        this.btn = document.getElementById('storeBtn');
        this.closeBtn = document.querySelector('.close-btn');
        this.content = document.getElementById('storeContent');
        this.selectedItem = null;
        
        this._initEvents();
    }
    
    _initEvents() {
        this.btn.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
    }
    
    open() {
        this.render();
        this.modal.style.display = 'flex';
    }
    
    close() {
        this.modal.style.display = 'none';
    }
    
    render() {
        const html = `
            <div style="margin-bottom: 15px; color: #f1c40f; text-align: center; font-size: 1.2rem;">
                🪙 Tus pegecoins: <span id="storeCoins">${window.pegecoins || 0}</span>
            </div>
            <select id="itemSelect" class="select-container">
                <option value="">-- Selecciona un artículo --</option>
                ${STORE_DATA.map((item) => `
                    <option value="${item.id}">
                        ${item.emoji} ${item.name} - ${item.price} 🪙
                    </option>
                `).join('')}
            </select>
            <div id="itemInfo" class="item-info">
                <p>🛒 Selecciona un artículo para ver su descripción</p>
            </div>
            <button id="buyBtn" class="buy-btn" style="display:none;">
                🛍️ Comprar
            </button>
        `;
        
        this.content.innerHTML = html;
        this._attachEvents();
    }
    
    _attachEvents() {
        const select = document.getElementById('itemSelect');
        const info = document.getElementById('itemInfo');
        const buyBtn = document.getElementById('buyBtn');
        const coinsDisplay = document.getElementById('storeCoins');
        
        if (coinsDisplay) {
            coinsDisplay.textContent = window.pegecoins || 0;
        }
        
        select?.addEventListener('change', () => {
            const id = parseInt(select.value);
            this.selectedItem = STORE_DATA.find(item => item.id === id);
            
            if (!this.selectedItem) {
                info.innerHTML = `<p>🛒 Selecciona un artículo para ver su descripción</p>`;
                buyBtn.style.display = 'none';
                return;
            }
            
            const currentCoins = window.pegecoins || 0;
            const hasEnough = currentCoins >= this.selectedItem.price;
            
            info.innerHTML = `
                <p><strong>${this.selectedItem.emoji} ${this.selectedItem.name}</strong></p>
                <p>${this.selectedItem.description}</p>
                <p style="color: ${hasEnough ? '#2ecc71' : '#e74c3c'};">
                    💰 Precio: ${this.selectedItem.price} pegecoins
                    ${hasEnough ? ' Disponible' : ' No tienes suficientes'}
                </p>
            `;
            
            buyBtn.style.display = 'block';
            buyBtn.disabled = !hasEnough;
            buyBtn.style.opacity = hasEnough ? '1' : '0.5';
            buyBtn.style.cursor = hasEnough ? 'pointer' : 'not-allowed';
            
            buyBtn.dataset.itemId = this.selectedItem.id;
        });
        
        buyBtn?.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.itemId);
            const item = STORE_DATA.find(i => i.id === itemId);
            
            if (!item) {
                console.error('Item no encontrado');
                return;
            }
            
            const currentCoins = window.pegecoins || 0;
            
            if (currentCoins >= item.price) {
                // Restar monedas
                window.pegecoins = currentCoins - item.price;
                
                // Actualizar en el juego
                if (window.gameScene) {
                    window.gameScene.pegecoins = window.pegecoins;
                    window.gameScene.scoreText.setText('🪙 ' + window.pegecoins);
                    
                }
                
                // Cerrar tienda
                const modal = document.getElementById('storeModal');
                if (modal) modal.style.display = 'none';
                
                // Efecto según el item comprado
                if (item.name === 'Café') {
                    if (window.gameScene && typeof window.gameScene._spawnCoffee === 'function') {
                        // Pequeño delay para que la notificación se vea bien
                        setTimeout(() => {
                            window.gameScene._spawnCoffee();
                        }, 300);
                    }
                }
                
                // Actualizar monedas en la tienda
                const coinsDisplay = document.getElementById('storeCoins');
                if (coinsDisplay) {
                    coinsDisplay.textContent = window.pegecoins;
                }
            } else {
                // Mostrar notificación de fondos insuficientes
                if (window.gameScene) {
                    window.gameScene.showNotification(
                        `No tienes suficientes pegecoins! Necesitas ${item.price}`,
                        '#e74c3c',
                        2000
                    );
                }
            }
        });
    }
}

// Inicializar la tienda cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new StoreManager();
});