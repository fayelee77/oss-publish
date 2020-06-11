const fs = require('fs');
const chalk = require("chalk");
const shell = require("shelljs");
const OSS = require('ali-oss');

let client = new OSS({
  region: '',
  //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
  accessKeyId: '',
  accessKeySecret: '',
  bucket: ''
});

const put = fileName => {
    // try {
    //     // object表示上传到OSS的Object名称，localfile表示本地文件或者文件路径
    //     let r1 = await client.put('object','localfile'); 
    //     console.log('put success: %j', r1);
    //     let r2 = await client.get('object');
    //     console.log('get success: %j', r2);
    //   } catch(e) {
    //     console.error('error: %j', err);
    //   }
}

const upload = async () => {
    const files = fs.readdirSync('./dist');
    Promise.all(files.map(fileName => put(fileName))).then(() => {
        console.log('上传成功！')
    }).catch(err => console.error('上传遇到错误', err));
}

try {
    console.log(chalk.blue(`\n开始打包, 请耐心等待...`));
    shell.exec('npm run build');
    console.log(chalk.blue(`\n打包完成`));
    console.log(chalk.blue(`\n开始同步文件，请耐心等待...`));
    put();
} catch (err) {
    console.error(chalk.red(`\nerror: ${err} happened when tnpm run build!`));
    process.exit(1);
}

