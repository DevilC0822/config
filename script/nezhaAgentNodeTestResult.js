/**
 * @description 哪吒探针节点详情页添加一些测试结果归档
 * @howtouse 
 * 进入哪吒探针管理端，自定义脚本处加入以下内容
  <script>
  const nodeCheckResult = {
    36: {  // 服务器节点 id 可通过节点详情页 url 获取；或者管理端服务器列表表格中查看
        remark: 'DMIT.EB.WEE', // 节点名称仅用于自我分辨
        NodeQuality: {
            type: 'iframe', // iframe | image
            url: 'https://nodequality.com/r/rki21soaA2SlcnF7vBd2jIuDKPfiS6fr', // 测试结果
        },
        Speedtest: {
            type: 'image', // iframe | image
            url: 'https://www.speedtest.net/result/17721869331.png', // 测试结果
            desc: '辽宁联通 1000M宽带测试', // 测试结果描述，可不填，仅在图片类型时有效
        },
        融合怪: {
            type: 'iframe', // iframe | image
            url: 'https://paste.spiritlhl.net/#/show/VKMWQ.txt', // 测试结果
        },
    },
    // 其他服务器节点...
  };
  </script>
  <script src="https://raw.githubusercontent.com/DevilC0822/config/refs/heads/main/script/nezhaAgentNodeTestResult.js"></script>
 * @url https://github.com/DevilC0822/config/blob/refs/heads/main/script/nezhaAgentNodeTestResult.js
 */

const scriptBsh = {
    NodeQuality: 'bash <(curl -sL https://run.NodeQuality.com)',
    '融合怪': 'bash <(wget -qO- --no-check-certificate https://gitlab.com/spiritysdx/za/-/raw/main/ecs.sh)',
};
const originalIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-4 h-4" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>`;
const successIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-4 h-4" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/></svg>`;

const init = () => {
    const urlSechem = new URL(window.location.href);
    const urlSechemPath = urlSechem.pathname.split('/');
    const currentServerId = urlSechemPath[urlSechemPath.length - 1];
    if (!currentServerId) {
        return;
    }
    const current = nodeCheckResult[currentServerId];
    if (!current) {
        return;
    }
    const mainRoot = document.querySelector(
        '#root > div.flex.min-h-screen.w-full.flex-col > main > div.mx-auto.w-full.max-w-5xl.px-0.flex.flex-col.gap-4.server-info',
    );
    if (mainRoot && nodeCheckResult) {
        if (document.getElementById('node-check-result-section')) {
            document.getElementById('node-check-result-section').remove();
        }
        const tabSection = document.createElement('section');
        tabSection.setAttribute('class', 'flex items-center my-2 w-full');
        tabSection.setAttribute('id', 'node-check-result-section');
        mainRoot.appendChild(tabSection);
        const left = document.createElement('div');
        left.setAttribute('data-orientation', 'horizontal');
        left.setAttribute('role', 'none');
        left.setAttribute('class', 'bg-border h-[1px] w-full flex-1');
        tabSection.appendChild(left);

        const divMain = document.createElement('div');
        divMain.setAttribute('class', 'flex justify-center w-full');
        divMain.style.flex = '0';
        divMain.style.margin = '0 36px';
        const divServerInfoTab = document.createElement('div');
        divServerInfoTab.setAttribute('class', 'z-50 flex flex-col items-start rounded-[50px] server-info-tab');
        divMain.appendChild(divServerInfoTab);
        const divFlexItemsCenterGap1 = document.createElement('div');
        divFlexItemsCenterGap1.setAttribute(
            'class',
            'flex items-center gap-1 rounded-[50px] p-[3px] bg-stone-100/70 dark:bg-stone-800/70',
        );
        divServerInfoTab.appendChild(divFlexItemsCenterGap1);

        Object.keys(current).filter(key => key !== 'remark').forEach(key => {
            const divRelativeCursorPointer1 = document.createElement('div');
            divRelativeCursorPointer1.setAttribute(
                'class',
                'relative cursor-pointer rounded-3xl px-2.5 py-[8px] text-[13px] font-[600] transition-all duration-500 text-black dark:text-white',
            );
            divRelativeCursorPointer1.setAttribute('id', key);
            divFlexItemsCenterGap1.appendChild(divRelativeCursorPointer1);
            const divRelativeZ20FlexItemsCenterGap1 = document.createElement('div');
            divRelativeZ20FlexItemsCenterGap1.setAttribute('class', 'relative z-20 flex items-center gap-1');
            divRelativeCursorPointer1.appendChild(divRelativeZ20FlexItemsCenterGap1);
            const p1 = document.createElement('p');
            p1.setAttribute('class', 'whitespace-nowrap');
            p1.textContent = key;
            p1.style.color = '#A8A29E';
            divRelativeZ20FlexItemsCenterGap1.appendChild(p1);
        });

        const allTabsDefault = divFlexItemsCenterGap1.querySelectorAll('.relative.cursor-pointer');
        if (allTabsDefault.length > 0) {
            const firstTabDefault = allTabsDefault[0];
            firstTabDefault.classList.add('bg-white', 'dark:bg-stone-700', 'dark:shadow-white/5');
            const firstTabPDefault = firstTabDefault.querySelector('p');
            if (firstTabPDefault) {
                firstTabPDefault.style.color = '';
            }
        }

        let currentTab = null;
        divFlexItemsCenterGap1.addEventListener('click', e => {
            const target = e.target.closest('.relative.cursor-pointer');
            if (target) {
                const tabId = target.getAttribute('id');
                if (tabId) {
                    currentTab = tabId;
                    const scriptSections = document.querySelectorAll('[data-script-section="true"]');
                    scriptSections.forEach(section => {
                        section.style.display = 'none';
                    });
                    const scriptDiv = document.getElementById(`script-${tabId}`);
                    if (scriptDiv) {
                        scriptDiv.style.display = 'block';
                    }
                    const mainSections = document.querySelectorAll('[data-main-section="true"]');
                    mainSections.forEach(section => {
                        section.style.display = 'none';
                    });
                    const contentDiv = document.getElementById(`content-${tabId}`);
                    if (contentDiv) {
                        contentDiv.style.display = 'block';
                    }
                }

                divFlexItemsCenterGap1.querySelectorAll('.relative.cursor-pointer').forEach(el => {
                    el.classList.remove('bg-white', 'dark:bg-stone-700', 'dark:shadow-white/5');
                    const pElement = el.querySelector('p');
                    if (pElement) {
                        pElement.style.color = '#A8A29E';
                    }
                });
                target.classList.add('bg-white', 'dark:bg-stone-700', 'dark:shadow-white/5');
                const selectedPElement = target.querySelector('p');
                if (selectedPElement) {
                    selectedPElement.style.color = '';
                }
            }
        });

        tabSection.appendChild(divMain);
        const right = document.createElement('div');
        right.setAttribute('data-orientation', 'horizontal');
        right.setAttribute('role', 'none');
        right.setAttribute('class', 'bg-border h-[1px] w-full flex-1');
        tabSection.appendChild(right);

        // 脚本地址
        const scriptSection = document.createElement('section');
        scriptSection.setAttribute('class', 'rounded-lg border text-card-foreground shadow-lg shadow-neutral-200/40 dark:shadow-none bg-card/70');
        scriptSection.setAttribute('data-script-section', 'true');
        scriptSection.style.padding = '16px';
        Object.keys(current).filter(key => key !== 'remark').forEach((key, index) => {
            const _key = Object.hasOwn(scriptBsh, current?.[key]?.script) ? current?.[key]?.script : Object.hasOwn(scriptBsh, key) ? key : '';
            if (!_key) {
                return;
            }
            scriptSection.setAttribute('id', `script-${_key}`);
            const scriptDiv = document.createElement('div');
            scriptDiv.style.display = index === 0 ? 'block' : 'none';
            const scriptP = document.createElement('p');
            scriptP.textContent = _key;
            scriptP.style.fontWeight = 'bold';
            scriptDiv.appendChild(scriptP);
            const scriptTextDiv = document.createElement('div');
            scriptTextDiv.setAttribute('class', 'flex items-center gap-2');
            const scriptText = document.createElement('span');
            scriptText.innerText = `${scriptBsh[_key]}`;
            scriptText.setAttribute('class', 'min-w-0 text-sm')
            scriptTextDiv.appendChild(scriptText);
            const scriptButton = document.createElement('button');
            scriptButton.innerHTML = originalIconSvg; // Unicode 复制图标 (📋)
            scriptButton.setAttribute('title', '复制'); // 鼠标悬停提示
            scriptButton.style.cursor = 'pointer';
            scriptButton.style.borderRadius = '4px';
            scriptButton.style.fontSize = '1em'; // 可以调整图标大小
            scriptTextDiv.appendChild(scriptButton);
            scriptDiv.appendChild(scriptTextDiv);
            scriptButton.addEventListener('click', () => {
                // 复制的内容会被 转义 例如 < 会被转义为 &lt; 避免转义
                const textToCopy = scriptText.innerText;
                const originalIcon = scriptButton.innerHTML;
                const failureIcon = '✗'; // 失败图标 (可选)

                // 尝试使用现代 Clipboard API
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        scriptButton.innerHTML = successIconSvg;
                        scriptButton.style.color = 'green';
                        setTimeout(() => {
                            scriptButton.innerHTML = originalIcon;
                            scriptButton.style.color = ''; // 恢复原始颜色
                        }, 1500); // 1.5秒后恢复图标
                    }).catch(err => {
                        // Clipboard API 失败，尝试旧方法 (通常在非 HTTPS 或用户未授权时失败)
                        tryCopyLegacy(textToCopy, scriptText, scriptButton, originalIcon, successIconSvg, failureIcon);
                    });
                } else {
                    // Clipboard API 不可用，使用旧方法
                    tryCopyLegacy(textToCopy, scriptText, scriptButton, originalIcon, successIconSvg, failureIcon);
                }
            });
            scriptSection.appendChild(scriptDiv);
        });
        mainRoot.appendChild(scriptSection);

        const mainSection = document.createElement('section');
        mainSection.setAttribute('class', 'rounded-lg border text-card-foreground shadow-lg shadow-neutral-200/40 dark:shadow-none bg-card/70');
        mainSection.style.padding = '16px';
        Object.keys(current).filter(key => key !== 'remark').forEach((key, index) => {
            const contentDiv = document.createElement('div');
            contentDiv.setAttribute('id', `content-${key}`);
            contentDiv.setAttribute('data-main-section', 'true');
            contentDiv.style.display = index === 0 ? 'block' : 'none';
            const { type, url, desc = '' } = current[key];
            if (type === 'image') {
                const img = document.createElement('img');
                img.src = url;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                contentDiv.appendChild(img);
                const p = document.createElement('p');
                p.textContent = desc;
                p.style.textAlign = 'center';
                p.style.marginTop = '8px';
                contentDiv.appendChild(p);
            }
            if (type === 'iframe') {
                const iframe = document.createElement('iframe');
                iframe.src = url;
                iframe.style.width = '100%';
                iframe.style.minHeight = '800px'; // 设置一个最小高度，或加载时的默认高度
                iframe.style.border = 'none'; // 移除 iframe 边框
                contentDiv.appendChild(iframe);
            }
            mainSection.appendChild(contentDiv);
        });
        mainRoot.appendChild(mainSection);
    }
};
// 页面完成加载 执行 init 函数
setTimeout(() => {
    init();
}, 1000);
window.addEventListener('popstate', () => {
    setTimeout(() => {
        init();
    }, 1000);
});
(function (history) {
    const pushState = history.pushState;
    history.pushState = function (state, unused, url) {
        // 调用原始的 pushState
        const result = pushState.apply(history, arguments);
        // 创建并触发自定义事件
        const event = new CustomEvent('pushstate', { detail: { state, url } });
        window.dispatchEvent(event);
        return result;
    };

})(window.history);

// 然后监听这些自定义事件
window.addEventListener('pushstate', function (event) {
    // 处理 URL 变化
    setTimeout(() => {
        init();
    }, 1000);
});