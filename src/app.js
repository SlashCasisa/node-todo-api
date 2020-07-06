const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const models = require('../db/models');
//处理跨域问题
var cors = require('cors');
app.use(cors());
//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(express.json());

// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// 所有的错误,http status = 500
// 登录接口
app.post('/login', async (req, res, next) => {
  try {
    let {
      username,
      password
    } = req.body;
    res.json({
      menus: [{
        path: '/',
        meta: {
          title: '桌面管理',
          icon: 'iconqiyetupu'
        },
        name: 'desktopManagement',
        children: [{
          path: '/desktopManagement/desktopPoolManagement',
          meta: {
            title: '桌面池管理',
            icon: 'iconqiyetupu'
          }
        }, {
          path: '/desktopManagement/desktopInformation',
          meta: {
            title: '桌面信息',
            icon: 'iconqiyetupu'
          }
        }]
      }],
      message: "登录成功",
      username,
      password
    })
  } catch (err) {
    next(err)
  }

})
// 登录接口
app.post('/getMenu', async (req, res, next) => {
  try {
    let {
      token
    } = req.body;
    res.json({
      menus: [{
        path: '/',
        meta: {
          title: '桌面管理',
          icon: 'iconqiyetupu'
        },
        name: 'desktopManagement',
        children: [{
          path: '/desktopManagement/desktopPoolManagement',
          meta: {
            title: '桌面池管理',
            icon: 'iconqiyetupu'
          }
        }, {
          path: '/desktopManagement/desktopInformation',
          meta: {
            title: '桌面信息',
            icon: 'iconqiyetupu'
          }
        }]
      }],
    })
  } catch (err) {
    next(err)
  }

})

//  查看任务列表
app.get('/list/:status/:page', async (req, res, next) => {
  let {
    status,
    page
  } = req.params;
  let limit = 10;
  let offset = (page - 1) * limit;
  let where = {}
  if (status != -1) {
    where.status = status;
  }

  // next(new Error('自定义异常'));
  // 1.状态 1:表示代办,2:完成,3:删除,-1:全部
  // 2.分页的处理
  let list = await models.Todo.findAndCountAll({
    where,
    offset,
    limit
  })
  res.json({
    list,
    message: '列表查询成功'
  })
})

// 创建一个todo(列表)
app.post('/create', async (req, res, next) => {
  try {
    let {
      name,
      deadline,
      content
    } = req.body;
    let todo = await models.Todo.create({
      name,
      deadline,
      content
    })
    res.json({
      todo,
      message: "创建任务成功"
    })
  } catch (err) {
    next(err)
  }

})



// 修改列表的某一列内容(编辑)
app.post('/update', async (req, res, next) => {
  try {
    let {
      name,
      deadline,
      content,
      id
    } = req.body;
    let todo = await models.Todo.findOne({
      where: {
        id
      }
    });
    if (todo) {
      todo.update({
        name,
        deadline,
        content,
        id
      })
    } else {
      next(new Error('没有对应todo'))
    }
    res.json({
      todo,
      message: "修改任务成功"
    })
  } catch (err) {
    next(err)
  }
})

// 删除任务or修改状态
app.post('/update_status', async (req, res) => {
  let {
    id,
    status
  } = req.body;
  let todo = await models.Todo.findOne({
    where: {
      id
    }
  });
  if (todo && status != todo.status) {
    // 执行更新
    todo = await todo.update({
      status
    })
  }
  res.json({
    todo
  })
})


// 中间件回调
app.use((err, req, res, nest) => {
  if (err) {
    res.status(500).json({
      message: err.message
    })
  }
})
app.listen(3001, () => {
  console.log('服务器启动成功');
})