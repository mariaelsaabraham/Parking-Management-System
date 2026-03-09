const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
  "https://ahvjvezeusaedzqljlzk.supabase.co",
  "sb_publishable_tLf_mZd_Hu94uTUszvgILQ_tLtmtVVn"
)

module.exports = supabase