export default function () {
  const body = document.querySelector("html")
  const html = `
      <div class="none" id="loading"><div class="ball-pulse-rise"><div></div><div></div><div></div><div></div><div></div></div></div>
      `
  body.insertAdjacentHTML("beforeend", html)
}