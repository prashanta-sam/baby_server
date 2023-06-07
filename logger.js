const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, json } = format;
// const customLogger = createLogger({
//     transports: [
//         new transports.File({
//              filename: 'info.log',
//              level:'info',
//              format:combine(timestamp(),json())
    
//             }),
//             new transports.File({
//                 filename: 'error.log',
//                 level:'error',
//                 format:combine(timestamp(),json())
       
//                }),

//       ]
//   });

  const customLogger = createLogger({
    levels: config.syslog.levels,
    defaultMeta: { component: 'custom-log' },
    transports: [
        new transports.Console(),
        new transports.File({ filename: './logs/combined.log',format:combine(timestamp(),json()) })
      ]
  });

  const infoLoger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ filename:'./logs/info.log',format:combine(timestamp(),json()) })
      ]
 });
 const errorLoger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ filename:'./logs/error.log',format:combine(timestamp(),json()) })
      ]
 });
  module.exports = {customLogger,errorLoger,infoLoger};