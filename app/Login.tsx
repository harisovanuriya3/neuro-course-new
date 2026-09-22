export default function Login() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Вход</h1>
      <form>
        <input type="text" placeholder="Логин" /><br />
        <input type="password" placeholder="Пароль" /><br />
        <button type="submit">Войти</button>
      </form>
    </main>
  );
}
