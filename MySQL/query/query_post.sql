select * from post where author = 'song';
INSERT INTO client.post(`name`, `author`, `content`)
     VALUES ('test3','song','this is test3');

select count(case when author = 'song' then 1 end) from post;