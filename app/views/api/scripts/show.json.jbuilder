json.(@found_script, :id, :title, :code, :description)
json.owner_id(@found_script.owner.id)
json.owner_name(@found_script.owner.username)