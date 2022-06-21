select * from comment;
INSERT INTO client.comment(`author`, `content`, `postnum`)
     VALUES ('song','this is test2',1);
     
select count(case when postnum = 1 then 1 end) from comment;
     
