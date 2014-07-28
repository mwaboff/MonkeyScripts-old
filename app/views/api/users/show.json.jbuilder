json.(@found_user, :id, :username)
json.scripts(@found_user.scripts, :id, :title, :short_desc, :downloads)
json.total_downloads(@total_downloads)
json.total_scripts(@total_scripts)