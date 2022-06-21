select * from `post` where author = 'song';
select * from `comment` where postnum = 1;
select count(case when postnum = 1 then 1 end) as `comment_count` from comment ;
select * from `attachments` where postnum = 1;

select 
post.`num` as post_num,
attachments.`postnum` as attachments_postnum,
comment.`postnum` as comment_postnum,
post.`author`,
post.`name`,
post.`content`,
attachments.`path`,
attachments.`order`,
( select count(case when post.num = comment.postnum then 1 end) from comment ) as comment_count
from post
left join attachments on post.num = attachments.postnum 
join comment on post.num = comment.postnum
group by attachments.`order`;
