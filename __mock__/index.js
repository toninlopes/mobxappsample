/* eslint-disable */
import { Mock } from 'react-native-fetch-mock';

export default {
    'GET https://jsonplaceholder.typicode.com/users': ({ method, url, params, urlparams, headers }) => {

        console.log(`=================================`);
        console.log(`FETCH MOCK`);
        console.log(`=================================`);
        console.log(`${method} for ${url} with ${JSON.stringify(params)} and ${JSON.stringify(urlparams)}`);
        console.log(``);

        const json = Mock.mock([
            {
                "id": 1,
                "name": "Leanne Graham",
                "username": "Bret",
                "email": "Sincere@april.biz"
            },
            {
                "id": 2,
                "name": "Ervin Howell",
                "username": "Antonette",
                "email": "Shanna@melissa.tv"
            },
            {
                "id": 3,
                "name": "Clementine Bauch",
                "username": "Samantha",
                "email": "Nathan@yesenia.net"
            },
            {
                "id": 4,
                "name": "Patricia Lebsack",
                "username": "Karianne",
                "email": "Julianne.OConner@kory.org"
            }
        ]);
        return {
            ok: 1,
            status: 200,
            data: json
        };
    },
    'GET https://jsonplaceholder.typicode.com/posts': ({ method, url, params, urlparams, headers }) => {

        console.log(`=================================`);
        console.log(`FETCH MOCK`);
        console.log(`=================================`);
        console.log(`${method} for ${url} with ${JSON.stringify(params)} and ${JSON.stringify(urlparams)}`);
        console.log(``);

        const json = Mock.mock(
            [
                {
                    "userId": 6,
                    "id": 51,
                    "title": "soluta aliquam aperiam consequatur illo quis voluptas",
                    "body": "sunt dolores aut doloribus\ndolore doloribus voluptates tempora et\ndoloremque et quo\ncum asperiores sit consectetur dolorem"
                },
                {
                    "userId": 6,
                    "id": 52,
                    "title": "qui enim et consequuntur quia animi quis voluptate quibusdam",
                    "body": "iusto est quibusdam fuga quas quaerat molestias\na enim ut sit accusamus enim\ntemporibus iusto accusantium provident architecto\nsoluta esse reprehenderit qui laborum"
                },
                {
                    "userId": 6,
                    "id": 53,
                    "title": "ut quo aut ducimus alias",
                    "body": "minima harum praesentium eum rerum illo dolore\nquasi exercitationem rerum nam\nporro quis neque quo\nconsequatur minus dolor quidem veritatis sunt non explicabo similique"
                },
                {
                    "userId": 6,
                    "id": 54,
                    "title": "sit asperiores ipsam eveniet odio non quia",
                    "body": "totam corporis dignissimos\nvitae dolorem ut occaecati accusamus\nex velit deserunt\net exercitationem vero incidunt corrupti mollitia"
                }
            ]);

        return {
            ok: 1,
            status: 200,
            data: json
        };
    },
    'DELETE https://jsonplaceholder.typicode.com/posts/{postId}': ({ method, url, params, urlparams, headers }) => {

        console.log(`=================================`);
        console.log(`FETCH MOCK`);
        console.log(`=================================`);
        console.log(`${method} for ${url} with ${JSON.stringify(params)} and ${JSON.stringify(urlparams)}`);
        console.log(``);

        return {
            ok: true,
            status: 200
        };
    },
    'PUT https://jsonplaceholder.typicode.com/posts/{postId}': ({ method, url, params, urlparams, headers }) => {

        console.log(`=================================`);
        console.log(`FETCH MOCK`);
        console.log(`=================================`);
        console.log(`${method} for ${url} with ${JSON.stringify(params)} and ${JSON.stringify(urlparams)}`);
        console.log(``);

        const json = Mock.mock({
            "userId": params.userId,
            "id": params.id,
            "title": params.title,
            "body": params.body
        });

        return {
            ok: true,
            status: 200,
            data: json
        };
    },
};
