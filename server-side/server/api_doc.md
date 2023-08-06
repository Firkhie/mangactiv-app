## Endpoints

List of Available Endpoints:

- `POST /register`
- `POST /login`
- `POST /google-login`
- `GET /popularmangas`
- `GET /updatedmangas`
- `GET /allmangas/:pageId`
- `GET /mangadetail/:id`
- `GET /readmanga/:chapterId/:pageId`

Routes below need authentication:

- `POST /mylibrary/:id`
- `GET /mylibrary`

Routes below need authentication & authorization:

- `DELETE /mylibrary/:id`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "username": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /popularmangas

Description:

- Get 2 popular mangas from 3rd party API

Request:

_Response (200 - OK)_

```json
[
  {
        "id": "3c0dddc9-d6da-4aa5-8ed2-12d26a6b08d4",
        "name": "Gokugoku Futsuu no Fuufu no Hanashi",
        "description": "Continuation of A Story About a Man and a Woman and When They Sleep Together, Money Appears Out of Nowhere posted by the author on pixiv.",
        "status": "ongoing",
        "year": 2020,
        "tags": [
            "Romance",
            "Web Comic",
            "Slice of Life"
        ],
        "coverArt": "https://uploads.mangadex.org/covers/3c0dddc9-d6da-4aa5-8ed2-12d26a6b08d4/b93778ac-5dab-4e40-b129-a84c13d8fac5.jpg",
        "latestChapter": "143.5",
        "authorName": "Katou Yuuichi"
    },
  ...
]
```

&nbsp;

## 4. GET /updatedmangas

Description:

- Get 6 updated mangas from 3rd party API

Request:

_Response (200 - OK)_

```json
[
  {
        "id": "3c0dddc9-d6da-4aa5-8ed2-12d26a6b08d4",
        "name": "Gokugoku Futsuu no Fuufu no Hanashi",
        "description": "Continuation of A Story About a Man and a Woman and When They Sleep Together, Money Appears Out of Nowhere posted by the author on pixiv.",
        "status": "ongoing",
        "year": 2020,
        "tags": [
            "Romance",
            "Web Comic",
            "Slice of Life"
        ],
        "coverArt": "https://uploads.mangadex.org/covers/3c0dddc9-d6da-4aa5-8ed2-12d26a6b08d4/b93778ac-5dab-4e40-b129-a84c13d8fac5.jpg",
        "latestChapter": "143.5",
        "authorName": "Katou Yuuichi"
    },
  ...
]
```

&nbsp;

## 5. GET /allmangas/:pageId

Description:

- Get 8 mangas per page from 3rd party API

Request:

_Response (200 - OK)_

```json
[
  {
        "id": "3c0dddc9-d6da-4aa5-8ed2-12d26a6b08d4",
        "name": "Gokugoku Futsuu no Fuufu no Hanashi",
        "description": "Continuation of A Story About a Man and a Woman and When They Sleep Together, Money Appears Out of Nowhere posted by the author on pixiv.",
        "status": "ongoing",
        "year": 2020,
        "tags": [
            "Romance",
            "Web Comic",
            "Slice of Life"
        ],
        "coverArt": "https://uploads.mangadex.org/covers/3c0dddc9-d6da-4aa5-8ed2-12d26a6b08d4/b93778ac-5dab-4e40-b129-a84c13d8fac5.jpg",
        "latestChapter": "143.5",
        "authorName": "Katou Yuuichi"
    },
  ...
]
```

&nbsp;

## 6. GET /mangadetail/:id

Description:

- Get manga detail from 3rd party API

Request:

_Response (200 - OK)_

```json
{
  "id": "9f40aeb0-9d07-4169-825c-b2b3db188823",
  "name": "The Predatory Marriage Between the King and the Paladin",
  "description": "\"Yes, I'll become a king. I'm going to take everything I want.\"  \n  \nBloody Calliope, a warlord who usurped the throne and began her quest to take control of neighboring countries.  \n  \nEzekiel, a famous, noble paladin, heads to Alpensia to stop the war.  \n  \nHis mission was to execute the King's command in order to stop the war, but…  \n  \nWhat awaited him when he arrived at the Royal Palace was not his King, but the frightening Calliope.  \n  \nCalliope, the warlord, and Ezekiel, the paladin, can the relationship between those two, started by force, develop into love?\n\n---\n- [Official Simplified Chinese Translation](https://www.dongmanmanhua.cn/LOVE/guowangheshengqishidelveduohun/list?title_no=1671)\n\n- [Official Indonesian Translation](https://www.webtoons.com/id/romantic-fantasy/the-king-and-the-paladin/list?title_no=3618)\n\n- [Official Japanese Translation](https://manga.line.me/product/periodic?id=Z0001353)\n\n- [Official French Translation](https://www.webtoons.com/fr/romance/le-mariage-force-de-la-reine-et-du-paladin/list?title_no=2991)",
  "status": "completed",
  "year": 2021,
  "tags": ["Historical", "Action", "Long Strip", "Romance", "Sexual Violence", "Drama", "Fantasy", "Web Comic", "Adaptation", "Full Color"],
  "coverArt": "https://uploads.mangadex.org/covers/9f40aeb0-9d07-4169-825c-b2b3db188823/4b4a1476-5435-4845-a4ef-36a0d9cd8678.jpg",
  "latestChapter": "e97a85a5-7c17-4e4e-bbb7-b387dcf9dde8",
  "totalChapters": 13,
  "chapters": [
    {
      "id": "64d33129-8bd8-4468-8ff6-25571155379f",
      "chapter": "1",
      "pageCount": 4
    },
    {
      "id": "af795283-768d-4e38-a17c-bc5c1d86ac86",
      "chapter": "2",
      "pageCount": 2
    },
    {
      "id": "761d9c7c-e69f-4edd-b9c5-8d3c83e3d829",
      "chapter": "3",
      "pageCount": 3
    },
    {
      "id": "76e9802c-649c-4c4a-90a6-7c6596ec4489",
      "chapter": "4",
      "pageCount": 2
    },
    {
      "id": "0171c774-ca46-4fc8-90e2-5bb2b43e5b6a",
      "chapter": "5",
      "pageCount": 1
    },
    {
      "id": "8debb216-7feb-4357-99df-d2b56f7084c1",
      "chapter": "6",
      "pageCount": 1
    }
  ]
}
```

&nbsp;

## 7. GET /readmanga/:chapterId/:pageId

Description:

- Get manga pages from 3rd party API

Request:

_Response (200 - OK)_

```json
{
  "totalPages": 5,
  "chapterImageUrl": "https://uploads.mangadex.org/data/985d8735d7ae972d9fdd5fbf922ff5e8/5-21ed27b4649da48bc0600bad196437e3508da26c47409b8aec61d4d8e37e8ca4.png"
}
```

&nbsp;

## 8. POST /mylibrary/:id

Description:

- Add new manga bookmark

Request:

- headers:

```json
{
  "id": "string"
}
```

- body:

```json
{
  "UserId": "integer"
}
```

_Response (201 - OK)_

```json
{
  "message": "Create new bookmark success!"
}
```

_Response (409 - Conflict)_

```json
{
  "message": "Manga already bookmarked"
}
```

&nbsp;

## 9. GET /mylibrary

Description:

- Get all bookmarked mangas

Request:

_Response (200 - OK)_

```json
{
  "UserId": 1,
    "bookmarks": [
      {
          "bookmarkId": 5,
          "id": "418791c0-35cf-4f87-936b-acd9cddf0989",
          "name": "The Fragrant Flower Blooms With Dignity",
          "status": "ongoing",
          "year": 2021,
          "tags": [
              "Romance",
              "Comedy",
              "Drama",
              "School Life",
              "Slice of Life"
          ],
          "coverArt": "https://uploads.mangadex.org/covers/418791c0-35cf-4f87-936b-acd9cddf0989/7647f935-29c8-4774-8b0b-50d0d30ef36b.jpg"
      },
      {
          "bookmarkId": 8,
          "id": "259dfd8a-f06a-4825-8fa6-a2dcd7274230",
          "name": "Yofukashi no Uta",
          "status": "ongoing",
          "year": 2019,
          "tags": [
              "Action",
              "Psychological",
              "Romance",
              "Comedy",
              "Drama",
              "Vampires",
              "Slice of Life",
              "Supernatural"
          ],
          "coverArt": "https://uploads.mangadex.org/covers/259dfd8a-f06a-4825-8fa6-a2dcd7274230/31fa9f2b-c6ac-4fd1-9b4b-1f77088d6833.png"
      },
    ...
  ]
}
```

&nbsp;

## 10. DELETE /mylibrary/:id

Description:

- Delete manga bookmark

Request:

- headers:

```json
{
  "id": "integer"
}
```

_Response (201 - OK)_

```json
{
  "message": "Success to delete id 13"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Bookmark not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
