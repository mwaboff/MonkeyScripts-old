json.(@found_script, :id, :title, :code, :short_desc, :description, :downloads, :updated_at, :created_at)
json.owner_id(@found_script.owner.id)
json.owner_name(@found_script.owner.username)