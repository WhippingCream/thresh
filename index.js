const { Builder, By, Key, until } = require('selenium-webdriver');

require('dotenv').config()

const chrome = require('selenium-webdriver/chrome');

module.exports.getLoginToken = async (id, password) => {  
  const options = new chrome.Options().addArguments('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

  const driver = new Builder()
    .forBrowser('chrome')
    .usingServer(`http://${process.env.SELENIUM_URI}`)
    .setChromeOptions(options)
    .build();
    
  try {
    await driver.get('https://kr.leagueoflegends.com/ko-kr/');
    await driver.manage().window().maximize();
    await driver.wait(until.elementLocated(By.linkText('로그인')));
    await driver.findElement(By.linkText('로그인')).click();
    await driver.wait(until.elementLocated(By.name('username')), 10000);
    await driver.findElement(By.name('username')).sendKeys(id);
    await driver.findElement(By.name('password')).sendKeys(password, Key.RETURN);
    await driver.wait(until.titleIs('리그 오브 레전드'), 10000);

    let cookies = await driver.manage().getCookies();

    for (const cookie of cookies)
    {
      if (cookie.name == 'id_token')
        return cookie.value;
    }
    
    return '';
  } catch (e) {
    console.log(JSON.stringify(e))
  } finally {
    await driver.quit();
  }
};
