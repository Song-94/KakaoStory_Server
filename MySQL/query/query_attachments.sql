select * from attachments;
INSERT INTO client.attachments(`postnum`, `path`, `order`)
     VALUES(1,'C:\\Project\\Postman\\uploads\\test3.jpg',3);

delete from attachments where postnum = 3;