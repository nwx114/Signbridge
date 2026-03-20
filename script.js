// SignBridge 智能手语交流平台 - 公共脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动
    smoothScroll();
    
    // 导航栏滚动效果
    navbarScroll();
    
    // 响应式菜单
    responsiveMenu();
    
    // 按钮悬停效果
    buttonHoverEffects();
    
    // 卡片悬停效果
    cardHoverEffects();
    
    // 表单验证
    formValidation();
    
    // 滚动动画
    scrollAnimations();
});

// 平滑滚动功能
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 导航栏滚动效果
function navbarScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = '#2c3e50';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.backgroundColor = '#2c3e50';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
}

// 响应式菜单
function responsiveMenu() {
    // 这里可以添加移动端菜单的逻辑
    // 例如汉堡菜单的实现
}

// 按钮悬停效果
function buttonHoverEffects() {
    const buttons = document.querySelectorAll('.btn, .course-btn, .contact-btn, .edit-profile-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// 卡片悬停效果
function cardHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .course-card, .emergency-type-card, .recommended-item, .post-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
    });
}

// 表单验证
function formValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                    input.style.backgroundColor = '#fef2f2';
                } else {
                    input.style.borderColor = '#ddd';
                    input.style.backgroundColor = 'white';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('请填写所有必填字段');
            }
        });
        
        // 输入框焦点效果
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = '#3498db';
                this.style.boxShadow = '0 0 0 2px rgba(52, 152, 219, 0.2)';
            });
            
            input.addEventListener('blur', function() {
                this.style.borderColor = '#ddd';
                this.style.boxShadow = 'none';
            });
        });
    });
}

// 滚动动画
function scrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .course-card, .emergency-type-card, .recommended-item');
    
    function checkInView() {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight * 0.85) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 初始设置
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 检查是否在视口中
    window.addEventListener('scroll', checkInView);
    checkInView(); // 初始检查
}

// 加载更多功能
function loadMoreContent() {
    const loadMoreButtons = document.querySelectorAll('.load-more');
    loadMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 加载中...';
            
            // 模拟加载延迟
            setTimeout(() => {
                this.innerHTML = '加载更多';
                alert('已加载更多内容');
            }, 1500);
        });
    });
}

// 模态框功能
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}