document.addEventListener('DOMContentLoaded', () => {
    // 1. Atualização dinâmica do ano no rodapé
    const elementoAno = document.getElementById('ano-atual');
    if (elementoAno) {
        elementoAno.textContent = new Date().getFullYear();
    }

    // 2. Controle do Menu Mobile
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        const menuIcon = menuBtn.querySelector('i');

        const setMenuState = (isOpen) => {
            mobileMenu.classList.toggle('hidden', !isOpen);
            menuBtn.classList.toggle('is-open', isOpen);
            menuBtn.setAttribute('aria-expanded', String(isOpen));
            menuBtn.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');

            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars', !isOpen);
                menuIcon.classList.toggle('fa-xmark', isOpen);
            }
        };

        menuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('hidden');
            setMenuState(isOpen);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                setMenuState(false);
                menuBtn.focus();
            }
        });

        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                setMenuState(false);
            });
        });
    }

    // 3. Preenchimento do formulário ao clicar nos cards de serviços
    const botoesServico = document.querySelectorAll('.btn-cotar-servico');
    const selectServico = document.getElementById('servico'); // Corrigido aqui de 'servico-interesse' para 'servico'

    botoesServico.forEach(botao => {
        botao.addEventListener('click', () => {
            const nomeServico = botao.getAttribute('data-servico');
            if (selectServico && nomeServico) {
                selectServico.value = nomeServico;
            }
        });
    });

    // 4. Manipulação e envio do formulário de cotação via WhatsApp
    const formCotacao = document.getElementById('form-cotacao');

    if (formCotacao) {
        formCotacao.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const email = document.getElementById('email').value.trim();
            const servico = document.getElementById('servico').value; // Corrigido aqui de 'servico-interesse' para 'servico'
            const mensagem = document.getElementById('mensagem').value.trim();

            const numeroWhatsApp = "5519971538470";

            let texto = `*NOVA SOLICITAÇÃO DE COTAÇÃO - SITE*\n\n`;
            texto += `*Nome:* ${nome}\n`;
            texto += `*Telefone:* ${telefone}\n`;
            texto += `*E-mail:* ${email}\n`;
            texto += `*Serviço de Interesse:* ${servico}\n`;

            if (mensagem) {
                texto += `*Observações:* ${mensagem}\n`;
            }

            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
            window.open(url, '_blank');
        });
    }
});
