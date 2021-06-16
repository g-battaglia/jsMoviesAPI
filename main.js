"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var searchInput = document.querySelector(".movieName");
var searchBtn = document.querySelector(".searchBtn");
var sortTypeInput = document.querySelector(".sortTypeInput");
var cardsContainer = document.getElementById("cardsContainer");
var getFromAPI = function (movieName) { return __awaiter(void 0, void 0, void 0, function () {
    var omdbURL, res, data, sortTypeValue, _i, data_1, obj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cardsContainer.innerHTML = "Loading";
                omdbURL = "https://movie-api-bt.herokuapp.com/" + movieName + "?l=20";
                return [4 /*yield*/, fetch(omdbURL)];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                console.log(data);
                cardsContainer.innerHTML = "";
                if (data.length == 0) {
                    cardsContainer.innerHTML = "No result";
                    return [2 /*return*/];
                }
                sortTypeValue = sortTypeInput.value;
                switch (sortTypeValue) {
                    case "Title":
                        data.sort(function (a, b) { return (a.Title > b.Title ? -1 : 1); });
                        break;
                    case "Rating":
                        data.sort(function (a, b) { return (a.imdbRating > b.imdbRating ? 1 : -1); });
                        break;
                    case "Year":
                        data.sort(function (a, b) { return (a.Year > b.Year ? -1 : 1); });
                        break;
                }
                for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                    obj = data_1[_i];
                    // Check if error in the list:
                    if (obj.Error) {
                        console.log("Error! Movie not found!");
                        return [2 /*return*/];
                    }
                    else {
                        // Append the movie to the DOM:
                        appendSuggestedMovie(obj);
                    }
                }
                return [2 /*return*/];
        }
    });
}); };
var appendSuggestedMovie = function (movieData) {
    var movieDiv = document.createElement("div");
    movieDiv.classList.add("card", "bg-light", "shadow", "m-3");
    movieDiv.innerHTML = "\n  <div class=\"card-img-top\" \n       style=\"background-image: url('" + movieData.Poster + "')\">\n  </div>\n  <div class=\"card-body\">\n    <h5 class=\"card-title\">" + movieData.Title + "</h5>\n    <p class=\"card-text\">" + movieData.Plot + "</p>\n    <p class=\"card-text\">\n      <small>Director: " + movieData.Director + "</small>\n      <br>\n      <small>Year: " + movieData.Year + "</small>\n      <br>\n      <small>IMDB Rating: " + movieData.imdbRating + "</small>\n    </p>\n    <a class=\"btn btn-outline-dark\" href=\"#\">Go somewhere</a>\n  </div>\n  ";
    cardsContainer.prepend(movieDiv);
};
var movieHandler = function () {
    console.log(searchInput);
    if (searchInput.value == "") {
        console.log("empty");
        return;
    }
    getFromAPI(searchInput.value);
};
searchBtn.addEventListener("click", movieHandler);
//# sourceMappingURL=main.js.map