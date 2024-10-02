from django.conf.urls.static import static
from django.urls import path
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from tourismBackend import settings
from .views import get_all_destinations, get_simple_destinations, get_promotions, create_user, login_view, get_available_destinations, get_reserved_destinations, create_reservation, reservations_by_location, get_location_names, reservations_by_location2


from . import views

urlpatterns = [
    path('simple_destinations/', get_simple_destinations, name='get_simple_destinations'),
    path('promotions/', get_promotions, name='promotions'),
    path('create_user/', create_user, name='user'),
    path('login/', login_view, name='login'),
    path('destinations/', get_all_destinations, name='get_all_destinations'),
    path('available_destinations/', get_available_destinations, name='get_available_destinations'),
    path('reserved_destinations/', get_reserved_destinations, name='get_reserved_destinations'),
    path('create_reservation/', create_reservation, name='create_reservation'),
    path('reservations_location/<str:location>', reservations_by_location, name='reservations_by_location'),
    path('get_locations/', get_location_names, name='get_locations' ),
    path('reservations_by_location2/<str:location>', reservations_by_location2, name='reservations_by_location2')

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    urlpatterns += staticfiles_urlpatterns()
