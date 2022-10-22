select *
from wpm_graphql.rateset_price rp,
    wpm_graphql.activitycode ac
where ac.activity_code = 'KDHVMR.20'
    and ac.id = rp.activitycode_id
    and rp.rateset_header_id = 1 --SELECT * from wpm_graphql.activitycode WHERE activity_code = 'KDHVMR.20'