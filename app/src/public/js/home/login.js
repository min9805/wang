const id = document.querySelector("#id"),
    psword = document.querySelector("#psword"),
    loginBtn = document.querySelector("#button");
//DOM 이란? (Document Object Model) 일종의 인터페이스임. 
//질의 선택자 선택자를 통해서 html의 값을 받아올 수 있음.
//ejs파일의 태그들에 대한 정보. 임의로 선택자를 만들어줄 수 있음.
//어싱크: 비동기, 디퍼: 순서대로 실행
loginBtn.addEventListener("click", login)
function login() {
    if(!id.value) {
        return alert("아이디를 입력해주십시오.");
    }
    if (!psword.value) {
        return alert("비밀번호를 입력해주십시오.")
    }
    const req = {
        id: id.value,
        psword: psword.value,
    }
    fetch("/login", {
        method: "POST", //body를 통해서 데이터를 전달할 때는 http메소드인 포스트로 전달해야함.
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req),//stringify는 데이터를 문자열로 바꿔주는 메소드
    })
        .then((res) => res.json())
        .then((res) => {
            if(res.success) {
                location.href = "/"; //로케이션 사용법? -> success했을 경우 "/"경로로 이동.
            }
            else {
                alert(res.msg) //화면에 창으로 띄워줌.
            }
        })
        .catch((err) => {
            console.error("로그인 중 에러 발생")
        })
}   