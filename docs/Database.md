# Database 설명

Mongo DB를 사용하고 있습니다.

#### Account

**acocunt**

|    **필드명**    |                           **설명**                           |
| :--------------: | :----------------------------------------------------------: |
|    **userId**    |   Type : String / required / unique<br/>유저 아이디입니다.   |
| **userPassword** | Type : String<br/>유저 비밀번호입니다. 암호화되어 저장됩니다. |
|   **userName**   |   Type : String / required / unique<br/>유저 닉네임입니다.   |
|  **userEmail**   |             Type : String<br/>유저 이메일입니다.             |
|  **userPoint**   | Type : Number<br/>유저 포인트입니다. (사용방법은 아직 미정)  |
| **profileImage** |         Type : File<br>유저의 프로파일 이미지입니다.         |
|  **createdAt**   |          Type : Date<br/>유저를 생성한 날짜입니다.           |
|  **updatedAt**   |        Type : Date<br/>유저 정보를 수정한 날짜입니다.        |
|   **isAdmin**    |            Type : Boolean <br/>관리자 여부입니다.            |



### Article

**article**

|      **필드명**      |                           **설명**                           |
| :------------------: | :----------------------------------------------------------: |
|  **articleWriter**   |       Type : ObjectId / required <br/>글 작성자입니다.       |
|   **articleTitle**   |         Type : String / required <br/>글 제목입니다.         |
|  **articleContent**  |         Type : String / required <br/>글 내용입니다.         |
| **articleViewCount** |             Type : Number <br/>글 조회수입니다.              |
|   **articleLikes**   | Type : Array\<ObjectId\> <br/>Ref : Account <br/>게시글 좋아요 인원입니다. |
|    **createdAt**     |           Type : Date<br/>글을 생성한 날짜입니다.            |
|    **updatedAt**     |           Type : Date<br/>글을 수정한 날짜입니다.            |

