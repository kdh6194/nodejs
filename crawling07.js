// 네이버 메일 갯수 확인

const axios = require('axios');
const {Builder,Browser,By,Key,until, promise} = require('selenium-webdriver');
const ncp = require('copy-paste');
const {elementLocated} = require("selenium-webdriver/lib/until");

async function mail() {
    const URL = 'https://www.naver.com/';

    const chrome = await new Builder(Browser.CHROME).forBrowser(Browser.CHROME).build();

    try {

        await chrome.get(URL);

        await chrome.wait(until.elementLocated(By.css('.link_login')),5000);
        // ,(컴마)가 아닌 .(점)으로 작성

        //로그인 버튼 클릭
        let loginbtn = await chrome.findElement(By.css('.link_login'));
        await chrome.actions().move({origin : loginbtn}).click().perform();

        await sleep(1000);

        // ---------
        const ids = await chrome.findElement(By.css('#id')); //class가 아닌 id로 잡아야 인식
        const pwds = await chrome.findElement(By.css('#pw'));
        let loginbtn1 = await chrome.findElement(By.css('.btn_login'));

        // 네이버에서는 이러한 행위를 봇으로 인식 -> 2차 인증 필요
        // await chrome.actions().sendKeys(ids,'kdh6194').perform();
        // await sleep(1000);
        //
        // await chrome.actions().sendKeys(pwds,'kdh6194').perform();
        // await sleep(1000);

        //아이디/비밀번호를 클립보드로 복사/붙여넣기 후 로그인 시도
        //클립보드 복사 모듈 : copy-paste

        ncp.copy('kdh6194');
        await chrome.actions().click(ids).keyDown(Key.CONTROL).sendKeys('v').perform();
        await sleep(1000);

        ncp.copy('kdh6194');
        await chrome.actions().click(pwds).keyDown(Key.CONTROL).sendKeys('v').perform();
        await sleep(1000);

        await chrome.actions().move({origin : loginbtn1}).click().perform();

    // ------------------------------

        let a = await count.getAttribute('textContent')
       console.log(a.trim());


    }catch (ex) {
        console.log(ex);
    }finally {
        await chrome.sleep(5000);
        await chrome.quit();
    }

    const html = await axios.get(URL,{
        headers : {'User_Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0'}
    }); // 주소자리 뒤에 화살표 함수쓰지말라고






}

// 일정시간 셀레니엄이 대기하도록 만드는 함수
const sleep = (ms) => new Promise(resolve=>setTimeout(resolve,ms));

mail();