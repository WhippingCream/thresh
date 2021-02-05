const { Builder, By, Key, until } = require("selenium-webdriver");

require("dotenv").config();

const chrome = require("selenium-webdriver/chrome");

const getLoginCookies = async (id, password) => {
  const options = new chrome.Options().addArguments(
    "user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  );

  const driver = new Builder()
    .forBrowser("chrome")
    .usingServer(process.env.SELENIUM_SERVER)
    .setChromeOptions(options)
    .build();

  try {
    await driver.get("https://kr.leagueoflegends.com/ko-kr/");
    await driver.manage().window().maximize();
    await driver.wait(until.elementLocated(By.linkText("로그인")));
    await driver.findElement(By.linkText("로그인")).click();
    await driver.wait(until.elementLocated(By.name("username")), 10000);
    await driver.findElement(By.name("username")).sendKeys(id);
    await driver
      .findElement(By.name("password"))
      .sendKeys(password, Key.RETURN);
    await driver.wait(until.titleIs("리그 오브 레전드"), 10000);

    const cookies = await driver.manage().getCookies();
    let ret = {};
    for (const cookie of cookies) {
      ret[cookie.name] = cookie.value;
    }
    return ret;
  } catch (e) {
    throw e;
  } finally {
    await driver.quit();
  }
};

const getLoginToken = async (id, password) => {
  const cookies = await getLoginCookies(id, password);
  return cookies["id_token"];
};

module.exports.getLoginCookies = getLoginCookies;
module.exports.getLoginToken = getLoginToken;
