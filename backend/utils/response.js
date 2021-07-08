const ResponseObject = {
    'Success' : {
        'Success' : {
            'code' : 2000,
            'status' : '성공 : 처리',
            'message' : '요청이 처리되었습니다.'
        },
        'Created' : {
            'code' : 2001,
            'status' : '성공 : 생성',
            'message' : '데이터가 생성되었습니다.'
        }
    },
    'Account' : {
        'Account' : {
            'code' : 3000,
            'status' : '에러 : 계정없음',
            'message' : '계정이 존재하지 않습니다.'
        },
        'Password' : {
            'code' : 3001,
            'status' : '에러 : 비밀번호 불일치',
            'message' : '비밀번호가 일치하지 않습니다.'
        }
    },
    'Duplication' : {
        'Data' : {
            'code' : 4001,
            'status' : '에러 : 데이터 중복',
            'message' : '이미 존재하는 데이터입니다.'
        },
        'File' : {
            'code' : 4002,
            'status' : '에러 : 파일 중복',
            'message' : '이미 존재하는 파일입니다.'
        }
    },
    'NotFound' : {
        'Data' : {
            'code' : 4041,
            'status' : '에러 : 데이터 없음',
            'message' : '데이터가 존재하지 않습니다.'
        },
        'File' : {
            'code' : 4042,
            'status' : '에러 : 파일 없음',
            'message' : '파일이 존재하지 않습니다.'
        }
    },
    'Server' : {
        'ServerError' : {
            'code' : 5000,
            'status' : '에러 : 서버 에러',
            'message' : '요청 처리 중 문제가 발생했습니다.'
        }
    },
    'ETC' : {
        'TokenError' : {
            'code' : 6000,
            'status' : '에러 : 토큰 에러',
            'message' : '토큰 검증 과정에서 문제가 발생했습니다.'
        }
    }
};

module.exports = ResponseObject;