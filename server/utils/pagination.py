from flask import request

def paginate_query(query, default_per_page=10, max_per_page=100):
    """
    Apply pagination to a SQLAlchemy query
    
    Args:
        query: SQLAlchemy query object
        default_per_page: Default number of items per page
        max_per_page: Maximum allowed items per page
    
    Returns:
        dict: Paginated response with data and metadata
    """
    # Get pagination parameters from request
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', default_per_page, type=int)
    
    # Validate parameters
    if page < 1:
        page = 1
    if per_page < 1:
        per_page = default_per_page
    if per_page > max_per_page:
        per_page = max_per_page
    
    # Execute pagination
    paginated = query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )
    
    return {
        'items': paginated.items,
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total_items': paginated.total,
            'total_pages': paginated.pages,
            'has_next': paginated.has_next,
            'has_prev': paginated.has_prev,
            'next_page': page + 1 if paginated.has_next else None,
            'prev_page': page - 1 if paginated.has_prev else None
        }
    }
