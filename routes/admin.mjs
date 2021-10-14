import { default as express } from "express";
import User from "../model/user.mjs";
import moment from "moment";
export const router = express.Router();

const getOffset = (page, size) => (page ? page * size : 0);

const customLabels = {
  totalDocs: "itemCount",
  docs: "itemsList",
  limit: "perPage",
  page: "currentPage",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "pageCount",
  pagingCounter: "slNo",
  meta: "paginator",
};

router.get("/", function (req, res) {
  const { page } = req.query;
  const size = 20;
  User.paginate(
    {},
    {
      limit: size,
      offset: getOffset(page, size),
      sort: { date: -1 },
      customLabels,
    },
    function (err, result) {
      console.log(result)
      // result.itemsList [here docs become itemsList]
      // result.paginator.itemCount = 100 [here totalDocs becomes itemCount]
      // result.paginator.perPage = 10 [here limit becomes perPage]
      // result.paginator.currentPage = 1 [here page becomes currentPage]
      // result.paginator.pageCount = 10 [here totalPages becomes pageCount]
      // result.paginator.next = 2 [here nextPage becomes next]
      // result.paginator.prev = null [here prevPage becomes prev]
      // result.paginator.slNo = 1 [here pagingCounter becomes slNo]
      // result.paginator.hasNextPage = true
      // result.paginator.hasPrevPage = false

      
      let allUsers = [];
      if (result.itemsList !== undefined) {
        allUsers = result.itemsList.map((user) => ({
          email: user.email,
          password: user.password,
          date: moment(user.date).format("MMMM Do YYYY, h:mm:ss a"),
        }));
      }

      if (err) {
        console.log(err);
        res.status(400).json({
          error: errorHandler.getErrorMessage(err),
        });
        return;
      } else {
        res.status(200).json({
          users: allUsers,
          ...result.paginator
        });
        return;
      }
    }
  );
});
// User.find({})
//   .sort({ date: -1 })
//   .exec(function (err, users) {
//     console.log(users);
//     let allUsers;
//     if(users){
//       allUsers = users.map((user) => ({
//       email: user.email,
//       password: user.password,
//       date: moment(user.date).format("MMMM Do YYYY, h:mm:ss a"),
//     }));
//     console.log(allUsers);
//     }

//     if (err) {
//       console.log(err);
//       res.status(400).json({
//         error: errorHandler.getErrorMessage(err),
//       });
//       return;
//     } else {
//       res.status(200).json({
//         users: allUsers,
//       });
//       return;
//     }
//   });
