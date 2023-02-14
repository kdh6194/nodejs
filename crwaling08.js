// 셀레니엄을 이용해서 k-apt.go.kr에서
// 2023,1월, 서울특별시 강남구, 삼성도, 아이파크삼성동의 주차장


const {Builder,Browser,By,Key,until, Select} = require('selenium-webdriver');
const {elementLocated} = require("selenium-webdriver/lib/until");

async function main() {
    const URL = 'https://k-apt.go.kr/';

    const chrome = await new Builder(Browser.CHROME).forBrowser(Browser.CHROME).build();

    try {
        await chrome.get(URL);

        // 기본단지 기본정보 버튼이 표시될때까지 5초 대기
        await chrome.wait(until.elementLocated(By.css('#nav > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)')),5000);
        //단지정보 버튼 클릭
        // let btn = await chrome.findElement(By.css('ul.wp220 li a'));
        // xpath를 사용하면 상당히 직관적으로 찾을 수 있다.
        // By.xpath('//태그[@선택자="지칭하는 단어"]')
        let btn = await chrome.findElement(By.xpath('//a[@title="단지정보"]'));
        await chrome.actions().move({origin : btn}).click().perform();
        //우리단지 기본정보 버튼 클릭
        let btn1 = await chrome.findElement(By.xpath('//a[@title="우리단지 기본정보"]'));
        await chrome.actions().move({origin : btn1}).click().perform();

        await chrome.sleep(1000)

        //------------------------
            let syear = '2023년';
            let smonth = '01월';
            let sido = '서울특별시';
            let gugun = '강남구';
            let dong = '삼성동';
            let apt = '아이파크삼성동';

            // 검색년도 값 설정
            let select = await chrome.findElement(By.name('searchYYYY'));
            await new Select(select).selectByVisibleText(syear);
            await sleep(500);
            //검색 월 값 설정
            let select1 = await chrome.findElement(By.name('searchMM'));
            await new Select(select1).selectByVisibleText(smonth);
            await sleep(500);
            //검색시도 값 설정
            let select2 = await chrome.findElement(By.name('combo_SIDO'));
            await new Select(select2).selectByVisibleText(sido);
            await sleep(500);
            //검색구군 값 설정
            let select3 = await chrome.findElement(By.name('combo_SGG'));
            await new Select(select3).selectByVisibleText(gugun);
            await sleep(500);
            //검색동 값 설정
            let select4 = await chrome.findElement(By.name('combo_EMD'));
            await new Select(select4).selectByVisibleText(dong);
            await sleep(500);
            //검색결과 출력 - 아파트명, 주소
            let select5 = await chrome.findElements(By.css('.aptS_rLName'));
            let select6 = await chrome.findElements(By.css('.aptS_rLAdd'));

            let pickss = [], Addr= []
            await chrome.getPageSource();
            for(let pick of select5){
            let pick1 = (await pick.getAttribute('textContent')).trim();
            pickss.push(pick1);
            }
            for(let pick of select6){
                let pick1 = (await pick.getAttribute('textContent')).trim();
                Addr.push(pick1);
            }
            for(let i =0; i <pickss.length;++i) {
                console.log(`${pickss[i]} ${Addr[i]}`)
            }
            await chrome.sleep(1500);

            // 아이파크 삼성동 항목을 찾아 인덱스값 추출
            let idx = 0;
            for(let apts of select5) {

                console.log(`${idx++} ${await apts.getAttribute('textContent')}`)
                // 각 개별 아파트이름 항목으로 마우스 포인터 이동
                await chrome.actions().move({origin:select5[idx]}).perform();
                if (await apts.getText() == apt) {break;}

            }

            // 추출한 인덱스 값을 이용해서 항목을 직접 클릭(여기선 리스트의 순번으로 찾으려고 하는듯)

            // 위에 for문에서 idx값이 정해지고나서 멈춘뒤에 idx에 초기화하기 때문에
            // idx값이 하나이다 (idx값이 여러개여서 배열이었다면 애당초 밑에 코드처럼 작성하면 안됨)
            let clicks = await chrome.findElement(
                By.css(`.mCSB_container ul li:nth-child(${idx}) a`));

            await chrome.actions().move({origin:clicks}).click().perform();
            // 주석처리된 구문도 작성시 정상적으로 작동된다
            // await chrome.executeScript('arguments[0].click();',select5[--idx]);

            // executeScript('arguments[원하는 인덱스].행동명령어',찾고자하는 변수명[idx에서 ++ 또는 --]);

            //-------------------
            //관리시설 정보 클릭
            // xpath로 찾을때는 title에 텍스트를 "(큰따옴표)로 작성을 해야한다
            //until 쓸때 제발 .(점) 좀 붙여서 써라
            await chrome.wait(until.elementLocated(By.css('.lnbNav li:nth-child(3) a')),5000);


            let click = await chrome.findElement(By.css('.lnbNav li:nth-child(3) a'));
            await chrome.actions().move({origin:click}).click().perform();

            await chrome.sleep(1500);
            // 지상/지하 주차장 대수 추출
            let pcnt = await chrome.findElement(By.css('#kaptd_pcnt')).getText();
            let pcntu = await chrome.findElement(By.css('#kaptd_pcntu')).getText();
            let tot = await chrome.findElement(By.css('#kaptd_total_pcnt')).getText();

            // 숨겨진 녀석들은 getText()로 가져오면 되고
            // 눈에 보이면 getAttribute()로 가져오면 됨
            console.log(`지상 : ${pcnt}, 지하 : ${pcntu},총 주차댓수 : ${tot}`);
             await chrome.sleep(1500);

    }catch (ex){
        console.log(ex);
    }finally {
        await  chrome.quit();
    }
}

const sleep = (ms) => new Promise(resolve=>setTimeout(resolve,ms));

main();