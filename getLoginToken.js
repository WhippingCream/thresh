const webdriver, { By, Key, until } = require('selenium-webdriver');

(async function example() {

  const account = '';
  const password = '';
  
  const driver = new webdriver.Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://kr.leagueoflegends.com/ko-kr/');
    await driver.wait(until.elementLocated(By.linkText('로그인')));
    await driver.findElement(By.linkText('로그인')).click();
    await driver.wait(until.titleIs('로그인'), 10000);
    await driver.findElement(By.name('username')).sendKeys(account);
    await driver.findElement(By.name('password')).sendKeys(password, Key.RETURN);
    await driver.wait(until.titleIs('리그 오브 레전드'), 10000);

    console.log(await driver.manage().getCookies());
  } catch (e) {
    console.log(JSON.stringify(e))
  } finally {
    await driver.quit();
  }
})();
