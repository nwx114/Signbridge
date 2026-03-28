// SignBridge 智能手语交流平台 - 公共脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
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

    // 功能卡片点击跳转
    featureCardClick();

    // 登录功能初始化
    initLogin();

    // 绑定导航菜单事件（页面加载时）
    bindNavMenuEvents();
});

// 平滑滚动功能
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
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

    window.addEventListener('scroll', function () {
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
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// 卡片悬停效果
function cardHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .course-card, .emergency-type-card, .recommended-item, .post-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
    });
}

// 表单验证
function formValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
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
            input.addEventListener('focus', function () {
                this.style.borderColor = '#3498db';
                this.style.boxShadow = '0 0 0 2px rgba(52, 152, 219, 0.2)';
            });

            input.addEventListener('blur', function () {
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
        button.addEventListener('click', function () {
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
        trigger.addEventListener('click', function () {
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
        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // 点击模态框外部关闭
    window.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// 功能卡片点击跳转
function featureCardClick() {
    const featureCards = document.querySelectorAll('.feature-card[data-href]');
    featureCards.forEach(card => {
        card.addEventListener('click', function () {
            const href = this.getAttribute('data-href');
            if (href) {
                window.location.href = href;
            }
        });
    });
}

// 登录功能
function initLogin() {
    // 检查登录状态
    checkLoginStatus();

    // 登录按钮点击事件
    const loginButtons = document.querySelectorAll('.login-btn');
    loginButtons.forEach(button => {
        button.addEventListener('click', function () {
            showLoginModal();
        });
    });

    // 注册按钮点击事件
    const registerButtons = document.querySelectorAll('.register-btn');
    registerButtons.forEach(button => {
        button.addEventListener('click', function () {
            showRegisterModal();
        });
    });

    // 退出登录按钮点击事件 - 移除，因为在updateUIForLoggedIn中已经绑定
    // 这样可以避免重复绑定事件监听器导致的多次弹出提示
}

// 检查登录状态
function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        // 已登录状态
        updateUIForLoggedIn(user);
    } else {
        // 未登录状态
        updateUIForLoggedOut();
    }
}

// 显示登录模态框
function showLoginModal() {
    // 检查是否已经存在登录模态框
    if (document.getElementById('loginModal')) {
        return; // 如果已存在，直接返回
    }

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'loginModal';
    modal.style.display = 'block';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1000';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.overflow = 'auto';
    modal.style.backgroundColor = 'rgba(0,0,0,0.4)';

    modal.innerHTML = `
        <div style="background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 80%; max-width: 400px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2>用户登录</h2>
                <span class="modal-close" style="color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer;">&times;</span>
            </div>
            <form id="loginForm" style="display: flex; flex-direction: column; gap: 15px;">
                <div>
                    <label for="loginUsername" style="display: block; margin-bottom: 5px; font-weight: bold;">用户名</label>
                    <input type="text" id="loginUsername" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                <div>
                    <label for="loginPassword" style="display: block; margin-bottom: 5px; font-weight: bold;">密码</label>
                    <input type="password" id="loginPassword" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                <div style="text-align: right;">
                    <a href="#" style="color: #3498db; text-decoration: none;">忘记密码?</a>
                </div>
                <button type="submit" class="btn btn-primary" style="padding: 10px; background-color: #3498db; color: white; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">登录</button>
                <div style="text-align: center; margin-top: 10px;">
                    还没有账号? <a href="#" class="register-link" style="color: #3498db; text-decoration: none;">立即注册</a>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // 关闭按钮事件
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        setTimeout(() => modal.remove(), 300);
    });

    // 点击外部关闭
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            setTimeout(() => modal.remove(), 300);
        }
    });

    // 注册链接点击事件
    const registerLink = modal.querySelector('.register-link');
    registerLink.addEventListener('click', function (e) {
        e.preventDefault();
        modal.style.display = 'none';
        setTimeout(() => modal.remove(), 300);
        showRegisterModal();
    });

    // 登录表单提交事件
    const loginForm = modal.querySelector('#loginForm');
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        if (login(username, password)) {
            // 立即关闭模态框
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // 立即移除模态框元素
            modal.remove();
        }
    });
}

// 显示注册模态框
function showRegisterModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'registerModal';
    modal.style.display = 'block';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1000';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.overflow = 'auto';
    modal.style.backgroundColor = 'rgba(0,0,0,0.4)';

    modal.innerHTML = `
        <div style="background-color: #fefefe; margin: 10% auto; padding: 20px; border: 1px solid #888; width: 80%; max-width: 400px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2>用户注册</h2>
                <span class="modal-close" style="color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer;">&times;</span>
            </div>
            <form id="registerForm" style="display: flex; flex-direction: column; gap: 15px;">
                <div>
                    <label for="registerUsername" style="display: block; margin-bottom: 5px; font-weight: bold;">用户名</label>
                    <input type="text" id="registerUsername" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                <div>
                    <label for="registerEmail" style="display: block; margin-bottom: 5px; font-weight: bold;">邮箱</label>
                    <input type="email" id="registerEmail" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                <div>
                    <label for="registerPassword" style="display: block; margin-bottom: 5px; font-weight: bold;">密码</label>
                    <input type="password" id="registerPassword" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                <div>
                    <label for="confirmPassword" style="display: block; margin-bottom: 5px; font-weight: bold;">确认密码</label>
                    <input type="password" id="confirmPassword" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                <button type="submit" class="btn btn-primary" style="padding: 10px; background-color: #3498db; color: white; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">注册</button>
                <div style="text-align: center; margin-top: 10px;">
                    已有账号? <a href="#" class="login-link" style="color: #3498db; text-decoration: none;">立即登录</a>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // 关闭按钮事件
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        setTimeout(() => modal.remove(), 300);
    });

    // 点击外部关闭
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            setTimeout(() => modal.remove(), 300);
        }
    });

    // 登录链接点击事件
    const loginLink = modal.querySelector('.login-link');
    loginLink.addEventListener('click', function (e) {
        e.preventDefault();
        modal.style.display = 'none';
        setTimeout(() => modal.remove(), 300);
        showLoginModal();
    });

    // 注册表单提交事件
    const registerForm = modal.querySelector('#registerForm');
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('两次输入的密码不一致');
            return;
        }

        if (register(username, email, password)) {
            // 立即关闭模态框
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // 立即移除模态框元素
            modal.remove();
        }
    });
}

// 关闭所有模态框
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
        modal.remove();
    });
    document.body.style.overflow = 'auto';
}

// 登录函数
function login(username, password) {
    // 从localStorage获取用户数据
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 查找用户
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // 登录成功
        localStorage.setItem('user', JSON.stringify(user));
        closeAllModals();
        updateUIForLoggedIn(user);
        alert('登录成功！');
        return true;
    } else {
        // 登录失败
        alert('用户名或密码错误');
        return false;
    }
}

// 注册函数
function register(username, email, password) {
    // 从localStorage获取用户数据
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 检查用户名是否已存在
    if (users.some(u => u.username === username)) {
        alert('用户名已存在');
        return false;
    }

    // 检查邮箱是否已被注册
    if (users.some(u => u.email === email)) {
        alert('邮箱已被注册');
        return false;
    }

    // 创建新用户
    const newUser = {
        id: Date.now().toString(),
        username: username,
        email: email,
        password: password,
        level: 1,
        completedCourses: 0,
        learningHours: 0,
        bio: ''
    };

    // 保存用户数据
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // 自动登录
    localStorage.setItem('user', JSON.stringify(newUser));
    closeAllModals();
    updateUIForLoggedIn(newUser);
    alert('注册成功！');
    return true;
}

// 退出登录
function logout() {
    if (confirm('确定要退出登录吗？')) {
        localStorage.removeItem('user');
        updateUIForLoggedOut();
        alert('已退出登录');
    }
}

// 更新已登录状态的UI
function updateUIForLoggedIn(user) {
    // 更新导航栏
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        // 查找登录/注册链接并替换为用户信息
        const profileLink = navLinks.querySelector('a[href="profile.html"]');
        if (profileLink) {
            profileLink.textContent = user.username;
            profileLink.title = '个人中心';
            // 确保保留个人中心链接
            profileLink.href = 'profile.html';
        }

        // 检查是否已存在退出登录按钮
        if (!navLinks.querySelector('.logout-btn')) {
            const logoutLi = document.createElement('li');
            logoutLi.innerHTML = '<a href="#" class="logout-btn">退出登录</a>';
            navLinks.appendChild(logoutLi);

            // 为新添加的退出登录按钮绑定事件
            const logoutBtn = logoutLi.querySelector('.logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    logout();
                });
            }
        }
    }

    // 更新个人中心页面
    const profileLayout = document.querySelector('.profile-layout');
    if (profileLayout) {
        // 检查是否需要重新创建个人中心布局
        const userCard = document.querySelector('.user-card');
        const profileContent = document.querySelector('.profile-content');

        if (!userCard || !profileContent) {
            // 重新创建个人中心布局
            profileLayout.innerHTML = `
                <!-- 左侧边栏 -->
                <div class="profile-sidebar">
                    <!-- 用户信息卡片 -->
                    <div class="user-card">
                        <div class="avatar">${user.avatar ? `<img src="${user.avatar}" style="width: 100%; height: 100%; object-fit: cover;">` : '👤'}</div>
                        <h2 class="user-name">${user.username}</h2>
                        <div class="user-level">Level ${user.level || 1}</div>
                        <div class="user-stats">
                            <div class="stat">
                                <div class="stat-number">${user.completedCourses || 0}</div>
                                <div class="stat-label">已完成课程</div>
                            </div>
                            <div class="stat">
                                <div class="stat-number">${user.learningHours || 0}</div>
                                <div class="stat-label">学习小时</div>
                            </div>
                        </div>
                        <button class="edit-profile-btn">编辑个人资料</button>
                    </div>

                    <!-- 导航菜单 -->
                    <div class="nav-menu">
                        <div class="nav-menu-item active">个人信息</div>
                        <div class="nav-menu-item">学习进度</div>
                        <div class="nav-menu-item">翻译历史</div>
                        <div class="nav-menu-item">账户设置</div>
                        <div class="nav-menu-item">隐私设置</div>
                        <div class="nav-menu-item">退出登录</div>
                    </div>
                </div>

                <!-- 右侧内容 -->
                <div class="profile-content">
                    <!-- 个人信息 -->
                    <div class="content-card">
                        <h2>个人信息</h2>
                        <form id="personalInfoForm">
                            <div class="form-group">
                                <label for="name">姓名</label>
                                <input type="text" id="name" value="${user.username}">
                            </div>
                            <div class="form-group">
                                <label for="email">邮箱</label>
                                <input type="email" id="email" value="${user.email}">
                            </div>
                            <div class="form-group">
                                <label for="phone">手机号码</label>
                                <input type="tel" id="phone" value="">
                            </div>
                            <div class="form-group">
                                <label for="language">偏好语言</label>
                                <select id="language">
                                    <option value="zh" selected>中文</option>
                                    <option value="en">英文</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="bio">个人简介</label>
                                <textarea id="bio" rows="3">${user.bio || '我是一名手语爱好者，希望通过SignBridge平台学习更多手语知识，与更多听障人士交流。'}</textarea>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary">保存更改</button>
                                <button type="button" class="btn btn-secondary">取消</button>
                            </div>
                        </form>
                    </div>

                    <!-- 学习进度 -->
                    <div class="content-card">
                        <h2>学习进度</h2>
                        <div class="progress-section">
                            <div class="progress-item">
                                <div class="progress-info">
                                    <span>手语基础入门</span>
                                    <span>100%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 100%;"></div>
                                </div>
                            </div>
                            <div class="progress-item">
                                <div class="progress-info">
                                    <span>日常生活用语</span>
                                    <span>75%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 75%;"></div>
                                </div>
                            </div>
                            <div class="progress-item">
                                <div class="progress-info">
                                    <span>职场沟通技巧</span>
                                    <span>45%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 45%;"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 最近活动 -->
                    <div class="content-card">
                        <h2>最近活动</h2>
                        <ul class="activity-list">
                            <li class="activity-item">
                                <div class="activity-icon">📚</div>
                                <div class="activity-content">
                                    <div class="activity-title">完成了课程：日常生活用语</div>
                                    <div class="activity-time">2026-03-14 15:30</div>
                                </div>
                            </li>
                            <li class="activity-item">
                                <div class="activity-icon">🔄</div>
                                <div class="activity-content">
                                    <div class="activity-title">使用了实时翻译功能</div>
                                    <div class="activity-time">2026-03-13 10:15</div>
                                </div>
                            </li>
                            <li class="activity-item">
                                <div class="activity-icon">💬</div>
                                <div class="activity-content">
                                    <div class="activity-title">在论坛发布了帖子</div>
                                    <div class="activity-time">2026-03-12 18:45</div>
                                </div>
                            </li>
                            <li class="activity-item">
                                <div class="activity-icon">📖</div>
                                <div class="activity-content">
                                    <div class="activity-title">开始学习：职场沟通技巧</div>
                                    <div class="activity-time">2026-03-11 09:20</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            `;

            // 重新绑定导航菜单事件
            const navMenuItems = document.querySelectorAll('.nav-menu-item');
            const contentCards = document.querySelectorAll('.content-card');

            navMenuItems.forEach(item => {
                item.addEventListener('click', function () {
                    // 移除所有菜单项的active类
                    navMenuItems.forEach(i => i.classList.remove('active'));
                    // 添加当前菜单项的active类
                    this.classList.add('active');

                    // 根据导航项文本找到对应的内容卡片
                    const navText = this.textContent.trim();
                    let targetCard = null;

                    if (navText === '个人信息') {
                        targetCard = contentCards[0];
                    } else if (navText === '学习进度') {
                        targetCard = contentCards[1];
                    } else if (navText === '翻译历史' || navText === '最近活动') {
                        // 跳转到实时翻译页面的翻译历史卡片
                        window.location.href = 'translate.html#history-section';
                        return;
                    } else if (navText === '账户设置') {
                        // 显示头像更换浮窗
                        showAvatarChangeModal();
                        return;
                    } else if (navText === '隐私设置') {
                        // 显示隐私设置浮窗
                        showPrivacySettingsModal();
                        return;
                    } else if (navText === '退出登录') {
                        logout();
                        return;
                    } else {
                        // 对于其他导航项，显示提示
                        alert('该功能正在开发中');
                        return;
                    }

                    // 滚动到对应的内容卡片
                    if (targetCard) {
                        targetCard.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                });
            });

            // 重新绑定编辑个人资料按钮事件
            const editProfileBtn = document.querySelector('.edit-profile-btn');
            if (editProfileBtn) {
                editProfileBtn.addEventListener('click', function () {
                    // 滚动到个人信息表单位置
                    const profileForm = document.querySelector('.content-card form');
                    if (profileForm) {
                        profileForm.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                });
            }

            // 重新绑定表单提交事件
            const form = document.querySelector('form');
            if (form) {
                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    alert('个人信息已保存');
                });
            }

            // 退出登录按钮事件已经在导航菜单事件中处理，无需重复绑定
        } else {
            // 更新现有元素
            const userName = userCard.querySelector('.user-name');
            const userLevel = userCard.querySelector('.user-level');
            const userStats = userCard.querySelector('.user-stats');
            const avatar = userCard.querySelector('.avatar');

            if (userName) userName.textContent = user.username;
            if (userLevel) userLevel.textContent = `Level ${user.level || 1}`;
            if (avatar) {
                if (user.avatar) {
                    avatar.innerHTML = `<img src="${user.avatar}" style="width: 100%; height: 100%; object-fit: cover;">`;
                } else {
                    avatar.innerHTML = '👤';
                }
            }
            if (userStats) {
                userStats.innerHTML = `
                    <div class="stat">
                        <div class="stat-number">${user.completedCourses || 0}</div>
                        <div class="stat-label">已完成课程</div>
                    </div>
                    <div class="stat">
                        <div class="stat-number">${user.learningHours || 0}</div>
                        <div class="stat-label">学习小时</div>
                    </div>
                `;
            }

            // 显示个人中心内容
            profileContent.style.display = 'block';
        }

        // 隐藏登录提示
        const loginPrompt = document.querySelector('.login-prompt');
        if (loginPrompt) {
            loginPrompt.style.display = 'none';
        }

        // 从数据库加载个人信息并填充表单
        loadPersonalInfoToForm(user.id);

        // 重新绑定导航菜单事件（无论是否重新创建布局都执行）
        bindNavMenuEvents();
    }
}

// 从数据库加载个人信息并填充表单
function loadPersonalInfoToForm(userId) {
    // 从数据库获取个人信息
    const personalInfo = getPersonalInfoFromDatabase(userId);

    if (personalInfo) {
        // 填充表单字段
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const languageSelect = document.getElementById('language');
        const bioTextarea = document.getElementById('bio');

        if (nameInput) nameInput.value = personalInfo.name || '';
        if (emailInput) emailInput.value = personalInfo.email || '';
        if (phoneInput) phoneInput.value = personalInfo.phone || '';
        if (languageSelect) languageSelect.value = personalInfo.language || 'zh';
        if (bioTextarea) bioTextarea.value = personalInfo.bio || '';
    }
}

// 绑定导航菜单事件
function bindNavMenuEvents() {
    const navMenuItems = document.querySelectorAll('.nav-menu-item');
    const contentCards = document.querySelectorAll('.content-card');

    // 先移除旧的事件监听器（避免重复绑定）
    navMenuItems.forEach(item => {
        // 移除所有事件监听器的方法：克隆元素并替换
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
    });

    // 重新获取元素并绑定新的事件监听器
    const updatedNavMenuItems = document.querySelectorAll('.nav-menu-item');
    updatedNavMenuItems.forEach(item => {
        item.addEventListener('click', function () {
            // 移除所有菜单项的active类
            updatedNavMenuItems.forEach(i => i.classList.remove('active'));
            // 添加当前菜单项的active类
            this.classList.add('active');

            // 根据导航项文本找到对应的内容卡片
            const navText = this.textContent.trim();
            let targetCard = null;

            if (navText === '个人信息') {
                targetCard = contentCards[0];
            } else if (navText === '学习进度') {
                targetCard = contentCards[1];
            } else if (navText === '翻译历史' || navText === '最近活动') {
                // 跳转到实时翻译页面的翻译历史卡片
                window.location.href = 'translate.html#history-section';
                return;
            } else if (navText === '账户设置') {
                // 显示头像更换浮窗
                showAvatarChangeModal();
                return;
            } else if (navText === '隐私设置') {
                // 显示隐私设置浮窗
                showPrivacySettingsModal();
                return;
            } else if (navText === '退出登录') {
                logout();
                return;
            } else {
                // 对于其他导航项，显示提示
                alert('该功能正在开发中');
                return;
            }

            // 滚动到对应的内容卡片
            if (targetCard) {
                targetCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });

    // 重新绑定编辑个人资料按钮事件
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    if (editProfileBtn) {
        // 移除旧的事件监听器
        const newEditBtn = editProfileBtn.cloneNode(true);
        editProfileBtn.parentNode.replaceChild(newEditBtn, editProfileBtn);

        // 绑定新的事件监听器
        newEditBtn.addEventListener('click', function () {
            // 滚动到个人信息表单位置
            const profileForm = document.querySelector('.content-card form');
            if (profileForm) {
                profileForm.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    }

    // 重新绑定表单提交事件
    const form = document.querySelector('form');
    if (form) {
        // 移除旧的事件监听器
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);

        // 绑定新的事件监听器
        newForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // 获取表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const language = document.getElementById('language').value;
            const bio = document.getElementById('bio').value;

            // 创建个人信息对象
            const personalInfo = {
                name: name,
                email: email,
                phone: phone,
                language: language,
                bio: bio,
                timestamp: new Date().toISOString()
            };

            // 获取当前用户信息
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user ? user.id : null;

            // 保存个人信息到数据库
            savePersonalInfoToDatabase(userId, personalInfo);

            // 同时更新用户数据库中的信息
            if (user) {
                user.username = name;
                user.email = email;
                user.bio = bio;
                localStorage.setItem('user', JSON.stringify(user));

                // 更新users数据库
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = users.findIndex(u => u.id === user.id);
                if (userIndex > -1) {
                    users[userIndex].username = name;
                    users[userIndex].email = email;
                    users[userIndex].bio = bio;
                    localStorage.setItem('users', JSON.stringify(users));
                }

                // 更新导航栏显示
                updateUIForLoggedIn(user);
            }

            alert('个人信息已保存');
        });
    }
}

// 更新未登录状态的UI
function updateUIForLoggedOut() {
    // 更新导航栏
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        // 查找个人中心链接并恢复为默认文本
        const profileLink = navLinks.querySelector('a[href="profile.html"]');
        if (profileLink) {
            profileLink.textContent = '个人中心';
            profileLink.title = '个人中心';
        }

        // 移除退出登录按钮
        const logoutBtn = navLinks.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.parentElement.remove();
        }
    }

    // 更新个人中心页面
    const profileLayout = document.querySelector('.profile-layout');
    if (profileLayout) {
        // 检查是否已存在登录提示
        if (!document.querySelector('.login-prompt')) {
            const loginPrompt = document.createElement('div');
            loginPrompt.className = 'login-prompt';
            loginPrompt.style.textAlign = 'center';
            loginPrompt.style.padding = '60px 20px';
            loginPrompt.style.backgroundColor = 'white';
            loginPrompt.style.borderRadius = '10px';
            loginPrompt.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            loginPrompt.style.margin = '0 auto';
            loginPrompt.style.maxWidth = '500px';

            loginPrompt.innerHTML = `
                <h2 style="font-size: 2rem; color: #2c3e50; margin-bottom: 1rem;">请先登录</h2>
                <p style="font-size: 1.1rem; color: #666; margin-bottom: 2rem;">登录后才能访问个人中心的功能</p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button class="btn btn-primary login-btn" style="padding: 0.8rem 1.5rem; background-color: #3498db; color: white; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">登录</button>
                    <button class="btn btn-secondary register-btn" style="padding: 0.8rem 1.5rem; background-color: #95a5a6; color: white; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">注册</button>
                </div>
            `;

            // 清空现有内容并添加登录提示
            profileLayout.innerHTML = '';
            profileLayout.appendChild(loginPrompt);
        }
    }

    // 重新绑定登录按钮事件
    const loginButtons = document.querySelectorAll('.login-btn');
    loginButtons.forEach(button => {
        button.addEventListener('click', function () {
            showLoginModal();
        });
    });

    const registerButtons = document.querySelectorAll('.register-btn');
    registerButtons.forEach(button => {
        button.addEventListener('click', function () {
            showRegisterModal();
        });
    });
}

// 显示头像更换浮窗
function showAvatarChangeModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'avatarChangeModal';
    modal.style.display = 'block';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1000';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';

    modal.innerHTML = `
        <div class="modal-content" style="background-color: white; padding: 2rem; border-radius: 10px; max-width: 500px; width: 90%; position: relative;">
            <button class="modal-close" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
            <h2 style="margin-bottom: 1.5rem; color: #2c3e50;">更换头像</h2>
            
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div id="avatarPreview" style="width: 120px; height: 120px; border-radius: 50%; background-color: #3498db; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 3rem; color: white; overflow: hidden;">
                    👤
                </div>
                <p style="color: #666; margin-bottom: 1rem;">点击下方按钮上传新头像</p>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <label for="avatarInput" style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #2c3e50;">选择图片</label>
                <input type="file" id="avatarInput" accept="image/*" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 5px;">
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button id="saveAvatarBtn" class="btn btn-primary" style="padding: 0.8rem 1.5rem; background-color: #3498db; color: white; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">保存头像</button>
                <button id="cancelAvatarBtn" class="btn btn-secondary" style="padding: 0.8rem 1.5rem; background-color: #95a5a6; color: white; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">取消</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // 关闭按钮事件
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        setTimeout(() => modal.remove(), 300);
    });

    // 点击外部关闭
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            setTimeout(() => modal.remove(), 300);
        }
    });

    // 取消按钮事件
    const cancelBtn = modal.querySelector('#cancelAvatarBtn');
    cancelBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        setTimeout(() => modal.remove(), 300);
    });

    // 头像预览
    const avatarInput = modal.querySelector('#avatarInput');
    const avatarPreview = modal.querySelector('#avatarPreview');

    avatarInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                avatarPreview.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // 保存头像按钮事件
    const saveAvatarBtn = modal.querySelector('#saveAvatarBtn');
    saveAvatarBtn.addEventListener('click', function () {
        const file = avatarInput.files[0];
        if (!file) {
            alert('请选择要上传的头像图片');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const avatarData = e.target.result;

            // 获取当前用户信息
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                alert('请先登录');
                return;
            }

            // 保存头像到数据库
            saveAvatarToDatabase(user.id, avatarData);

            // 更新用户信息中的头像
            user.avatar = avatarData;
            localStorage.setItem('user', JSON.stringify(user));

            // 更新用户数据库中的头像
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(u => u.id === user.id);
            if (userIndex > -1) {
                users[userIndex].avatar = avatarData;
                localStorage.setItem('users', JSON.stringify(users));
            }

            // 更新页面上的头像显示
            const avatarElement = document.querySelector('.avatar');
            if (avatarElement) {
                avatarElement.innerHTML = `<img src="${avatarData}" style="width: 100%; height: 100%; object-fit: cover;">`;
            }

            // 关闭浮窗
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            setTimeout(() => modal.remove(), 300);

            alert('头像更换成功！');
        };
        reader.readAsDataURL(file);
    });
}

// 保存头像到数据库
function saveAvatarToDatabase(userId, avatarData) {
    // 从localStorage获取头像数据库
    const avatars = JSON.parse(localStorage.getItem('avatars')) || {};

    // 保存或更新用户头像
    avatars[userId] = avatarData;

    // 保存到localStorage
    localStorage.setItem('avatars', JSON.stringify(avatars));
}

// 从数据库获取用户头像
function getAvatarFromDatabase(userId) {
    const avatars = JSON.parse(localStorage.getItem('avatars')) || {};
    return avatars[userId] || null;
}

// 显示隐私设置浮窗
function showPrivacySettingsModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'privacySettingsModal';
    modal.style.display = 'block';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1000';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';

    // 获取当前用户信息
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;

    // 从数据库获取用户隐私信息
    const userPrivacyInfo = getPrivacyInfoFromDatabase(userId);

    modal.innerHTML = `
        <div class="modal-content" style="background-color: white; padding: 2rem; border-radius: 10px; max-width: 500px; width: 90%; position: relative;">
            <button class="modal-close" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
            <h2 style="margin-bottom: 1.5rem; color: #2c3e50;">隐私设置</h2>
            
            <form id="privacyForm">
                <div style="margin-bottom: 1.5rem;">
                    <label for="privacyName" style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #2c3e50;">姓名</label>
                    <input type="text" id="privacyName" value="${userPrivacyInfo ? userPrivacyInfo.name : ''}" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem;">
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label for="privacyPhone" style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #2c3e50;">手机号码</label>
                    <input type="tel" id="privacyPhone" value="${userPrivacyInfo ? userPrivacyInfo.phone : ''}" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem;">
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label for="privacyIdCard" style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #2c3e50;">身份证号</label>
                    <input type="text" id="privacyIdCard" value="${userPrivacyInfo ? userPrivacyInfo.idCard : ''}" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem;">
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label for="privacyLocation" style="display: block; margin-bottom: 0.5rem; font-weight: bold; color: #2c3e50;">位置</label>
                    <input type="text" id="privacyLocation" value="${userPrivacyInfo ? userPrivacyInfo.location : ''}" style="width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem;">
                    <button type="button" id="getLocationBtn" style="margin-top: 0.5rem; padding: 0.5rem 1rem; background-color: #3498db; color: white; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">获取当前位置</button>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button type="submit" class="btn btn-primary" style="padding: 0.8rem 1.5rem; background-color: #3498db; color: white; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">保存信息</button>
                    <button type="button" id="cancelPrivacyBtn" class="btn btn-secondary" style="padding: 0.8rem 1.5rem; background-color: #95a5a6; color: white; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">取消</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // 关闭按钮事件
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        setTimeout(() => modal.remove(), 300);
    });

    // 点击外部关闭
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            setTimeout(() => modal.remove(), 300);
        }
    });

    // 取消按钮事件
    const cancelBtn = modal.querySelector('#cancelPrivacyBtn');
    cancelBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        setTimeout(() => modal.remove(), 300);
    });

    // 获取当前位置按钮事件
    const getLocationBtn = modal.querySelector('#getLocationBtn');
    getLocationBtn.addEventListener('click', function () {
        if (navigator.geolocation) {
            getLocationBtn.innerHTML = '获取中...';
            getLocationBtn.disabled = true;

            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    // 这里可以使用逆地理编码API获取具体地址
                    // 为了简化，我们直接显示经纬度
                    document.getElementById('privacyLocation').value = `纬度: ${lat.toFixed(6)}, 经度: ${lng.toFixed(6)}`;

                    getLocationBtn.innerHTML = '获取当前位置';
                    getLocationBtn.disabled = false;
                },
                function (error) {
                    console.error('获取位置失败:', error);
                    alert('获取位置失败，请手动输入位置信息');
                    getLocationBtn.innerHTML = '获取当前位置';
                    getLocationBtn.disabled = false;
                }
            );
        } else {
            alert('您的浏览器不支持地理定位功能');
        }
    });

    // 表单提交事件
    const privacyForm = modal.querySelector('#privacyForm');
    privacyForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('privacyName').value;
        const phone = document.getElementById('privacyPhone').value;
        const idCard = document.getElementById('privacyIdCard').value;
        const location = document.getElementById('privacyLocation').value;

        if (!name || !phone || !idCard || !location) {
            alert('请填写完整的个人信息');
            return;
        }

        // 保存隐私信息到数据库
        const privacyInfo = {
            name: name,
            phone: phone,
            idCard: idCard,
            location: location
        };

        savePrivacyInfoToDatabase(userId, privacyInfo);

        // 关闭浮窗
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        setTimeout(() => modal.remove(), 300);

        alert('隐私信息保存成功！');
    });
}

// 保存隐私信息到数据库
function savePrivacyInfoToDatabase(userId, privacyInfo) {
    // 从localStorage获取隐私信息数据库
    const privacyData = JSON.parse(localStorage.getItem('privacyData')) || {};

    // 保存或更新用户隐私信息
    if (userId) {
        privacyData[userId] = privacyInfo;
    } else {
        // 如果没有用户ID，使用临时存储
        privacyData['temp'] = privacyInfo;
    }

    // 保存到localStorage
    localStorage.setItem('privacyData', JSON.stringify(privacyData));
}

// 从数据库获取用户隐私信息
function getPrivacyInfoFromDatabase(userId) {
    const privacyData = JSON.parse(localStorage.getItem('privacyData')) || {};
    if (userId) {
        return privacyData[userId] || null;
    } else {
        return privacyData['temp'] || null;
    }
}

// 保存个人信息到数据库
function savePersonalInfoToDatabase(userId, personalInfo) {
    // 从localStorage获取个人信息数据库
    const personalData = JSON.parse(localStorage.getItem('personalData')) || {};

    // 保存或更新用户个人信息
    if (userId) {
        personalData[userId] = personalInfo;
    } else {
        // 如果没有用户ID，使用临时存储
        personalData['temp'] = personalInfo;
    }

    // 保存到localStorage
    localStorage.setItem('personalData', JSON.stringify(personalData));
}

// 从数据库获取用户个人信息
function getPersonalInfoFromDatabase(userId) {
    const personalData = JSON.parse(localStorage.getItem('personalData')) || {};
    if (userId) {
        return personalData[userId] || null;
    } else {
        return personalData['temp'] || null;
    }
}