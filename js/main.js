        const menuToggle = document.querySelector('.menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
        
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!link.classList.contains('nav-cta-button')) {
                     mainNav.classList.remove('active');
                }
            });
        });
        
        const modal = document.getElementById('pedidoModal');
        const btnOpenHero = document.getElementById('openModalHero');
        const btnOpenNav = document.getElementById('openModalNav');
        const spanClose = document.getElementsByClassName('close-button')[0];
        const formPedido = document.getElementById('formPedido');
        
        const abrirModal = () => {
            modal.style.display = 'block';
        }

        btnOpenHero.addEventListener('click', abrirModal);
        
        btnOpenNav.addEventListener('click', (e) => {
            e.preventDefault();
            abrirModal();
        });

        spanClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
        
        window.abrirModalComOpcao = (produto, quantidade) => {
            document.getElementById('produto').value = produto;

            document.getElementById('quantidade').value = parseInt(quantidade, 10); 
            abrirModal();
        }

        formPedido.addEventListener('submit', function(e) {
            e.preventDefault();

            const produto = document.getElementById('produto').value;
            const quantidade = document.getElementById('quantidade').value;
            const nome = document.getElementById('nome').value;
            const endereco = document.getElementById('endereco').value;
            const observacoes = document.getElementById('observacoes').value;
            
            if (!produto || produto === "") {
                alert('Por favor, selecione um Produto desejado.');
                document.getElementById('produto').focus();
                return;
            }

            if (!quantidade || !nome || !endereco) {
                alert('Por favor, preencha todos os campos obrigatórios (Quantidade, Nome e Endereço).');
                return;
            }
            
            if (parseInt(quantidade, 10) <= 0 || isNaN(parseInt(quantidade, 10))) {
                 alert('A quantidade deve ser um número válido e maior que zero.');
                 document.getElementById('quantidade').focus();
                 return;
            }

            let mensagem = `*NOVO PEDIDO VIA SITE DO PÃO DE QUEIJO DA IRÁ!* \n\n`;
            mensagem += `*Cliente:* ${nome}\n`;
            mensagem += `*Produto:* ${produto}\n`;
            mensagem += `*Quantidade de Pacotes:* ${quantidade}\n`;
            mensagem += `*Endereço:* ${endereco}\n`;
            
            if (observacoes) {
                mensagem += `*Observações:* ${observacoes}\n`;
            } else {
                mensagem += `*Observações:* Nenhuma\n`;
            }
            
            mensagem += `\n*Atenção:* Por favor, confirme o valor total e o prazo de entrega.`;

            const numeroTelefone = '5561982777196'; 

            const mensagemCodificada = encodeURIComponent(mensagem);
            
            const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${mensagemCodificada}`;
            
            window.open(linkWhatsApp, '_blank');
            
            modal.style.display = 'none'; 
 
            formPedido.reset();
        });
