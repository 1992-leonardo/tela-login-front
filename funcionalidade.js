document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.getElementById("login-form");
    const botaoLogin = document.getElementById("botao-login");

    if (formLogin && botaoLogin) {
        botaoLogin.addEventListener("click", function (event) {
            event.preventDefault();
            formLogin.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        });

        formLogin.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;

            if (!email || !senha) {
                alert("Por favor, preencha todos os campos!");
                return;
            }

            const dadosLogin = { email, senha };

            try {
                const resposta = await fetch("http://localhost:8080/usuarios/login", {
                    method: "POST",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dadosLogin)
                });

                const resultado = await resposta.json(); // Ler a resposta sempre como JSON

                if (!resposta.ok) {
                    throw new Error(resultado.erro || "Erro ao realizar login!");
                }

                console.log("Login realizado com sucesso:", resultado);
                alert("Login realizado com sucesso!");
                window.location.href = "logado.html";

            } catch (erro) {
                if (erro.message.includes("Usuário ou senha inválidos")) {
                    console.warn("Tentativa de login falhou: " + erro.message);
                } else {
                    console.error("Erro inesperado ao conectar com o backend:", erro.message);
                }
                alert(erro.message);
            }
        });
    }
});
