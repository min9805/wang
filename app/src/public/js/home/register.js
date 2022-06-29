const id = document.querySelector("#id"),
    name = document.querySelector("#name"),
    psword = document.querySelector("#psword"),
    confirmPsword = document.querySelector("#confirm-psword"),  //공백표시를 대문자, - 으로 한다는데 뭔소린지...
    registerBtn = document.querySelector("#button");
//DOM 이란? (Document Object Model) 일종의 인터페이스임. 
//질의 선택자 선택자를 통해서 html의 값을 받아올 수 있음.
//ejs파일의 태그들에 대한 정보. 임의로 선택자를 만들어줄 수 있음.
//어싱크: 비동기, 디퍼: 순서대로 실행
registerBtn.addEventListener("click", register)
function register() {
    if (!id.value) {
        return alert("아이디를 입력해주십시오.");
    }
    if (!psword.value) {
        return alert("비밀번호를 입력해주십시오.")
    }
    if (psword.value !== confirmPsword.value) {
        return alert("비밀번호가 일치하지 않습니다.");
    }

    const req = {
        id: id.value,
        name: name.value,
        psword: psword.value,
    }
    fetch("/register", {  //fetch사용법 확인.
        method: "POST", //body(에 담아서)를 통해서 데이터를 전달할 때는 http메소드인 포스트로 전달해야함.
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req),//stringify는 데이터를 문자열로 바꿔주는 메소드
    })
        .then((res) => res.json()) //서버에 응답이 다 받아지는 순간 promise객체가 생성
        .then((res) => {
            if(res.success) {
                location.href = "/login"; //로케이션 사용법? -> success했을 경우 "/"경로로 이동.
            }
            else {
                alert(res.msg) //화면에 창으로 띄워줌
            }
        })
        .catch((err) => {
            console.error("회원가입 중 에러 발생")
    })
}   